import config from '../../config';
import type { IExtendedRequest, ModifySwaggerMiddleware } from '../types';

const modifySwaggerDoc: ModifySwaggerMiddleware = (swaggerDocument) => 
    (req: IExtendedRequest, res, next) => {
        swaggerDocument.servers[0] = { url: `${ req.protocol }://${ req.host }:${ config.port }` };
        req.swaggerDoc = swaggerDocument;
        next();
    };

export { modifySwaggerDoc };