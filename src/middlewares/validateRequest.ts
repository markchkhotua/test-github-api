import { RequestHandler } from 'express';
import APIError from '../errors/APIError';
import { HttpCodes } from '../enums';

const validateRequest: RequestHandler = (req, res, next) => {
    const { accept } = req.headers;
    if(accept?.includes('application/xml'))
        return next(new APIError('application/xml Accept header is not acceptable', HttpCodes.NOT_ACCEPTABLE));
    if(!accept?.includes('application/json'))
        return next(new APIError('Missing application/json Accept header', HttpCodes.BAD_REQUEST));
    next();
};

export { validateRequest };