import type { RequestHandler } from 'express';
import { ApiError } from '../errors';
import { HttpCodes } from '../enums';
import type { IExtendedRequest } from '../types';

const validateRequestMiddlewares: RequestHandler = (req: IExtendedRequest, res, next) => {
    const { accept } = req.headers;
    if(accept?.includes('application/xml'))
        return next(new ApiError('application/xml Accept header is not acceptable', HttpCodes.NOT_ACCEPTABLE));
    if(!accept?.includes('application/json'))
        return next(new ApiError('Missing application/json Accept header', HttpCodes.BAD_REQUEST));
    next();
};

export { validateRequestMiddlewares };