import express, { Express, NextFunction, Request, Response } from 'express';
import createError, { HttpError } from 'http-errors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import APIError from './errors/APIError';
import indexRouter from './routes';
const swaggerDocument = yaml.load('swagger.yaml');
import { modifySwaggerDoc } from './middlewares/swagger';

const app: Express = express();

const swaggerOptions = { swaggerOptions: { defaultModelsExpandDepth: -1 } };

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('etag');
app.use('/', indexRouter);
app.use('/api-docs',
    modifySwaggerDoc(swaggerDocument),
    swaggerUI.serveFiles(swaggerDocument, swaggerOptions),
    swaggerUI.setup());

app.use((req: Request, res: Response, next: NextFunction) => next(createError(404)));

app.use((err: HttpError | APIError, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof APIError) {
        return res.status(err.status).send(err.getResponseObject());
    }
    res.status(err.status || 500);
    res.json({ status: res.status, Message: err.message });
});

export default app;
