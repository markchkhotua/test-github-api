import type { RequestHandler } from 'express';

const defaultHandler: RequestHandler = (req, res) =>
    res.status(200).send({ status: 200, Message: 'OK' });

export default defaultHandler;
export * from './repositories.controllers';