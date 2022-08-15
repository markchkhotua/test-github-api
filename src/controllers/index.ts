import type { RequestHandler } from 'express';
import { HttpCodes } from '../enums';

const defaultHandler: RequestHandler = (req, res) =>
    res.status(HttpCodes.OK).json({ status: HttpCodes.OK, Message: 'OK' });

export default defaultHandler;
export * from './repositories.controllers';