import type { Request, RequestHandler } from 'express';
import type { SwaggerOptions } from 'swagger-ui-express';

export interface IExtendedRequest extends Request {
    swaggerDoc?: object,
    headers: {
        accept?: string
    }
}

export type ModifySwaggerMiddleware = (swaggerDoc: SwaggerOptions) => RequestHandler
