import { Request, RequestHandler } from 'express';
import { SwaggerOptions } from 'swagger-ui-express';

export interface IExtendedRequest extends Request {
    swaggerDoc?: object
}

export type ModifySwaggerMiddleware = (swaggerDoc: SwaggerOptions) => RequestHandler
