import config from '../../config';
import { NextFunction, Response } from 'express';
import { ExtendedRequest } from '../types';

const modifySwaggerDoc = (swaggerDocument: any) => (req: ExtendedRequest, res: Response, next: NextFunction) => {
    swaggerDocument.servers[0] = { url: `${ req.protocol }://${ req.host }:${ config.port }` };
    req.swaggerDoc = swaggerDocument;
    next();
};

export { modifySwaggerDoc };