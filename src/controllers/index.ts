import { RequestHandler } from 'express';
import { repositoriesController } from './github';

const defaultHandler: RequestHandler = (req, res) => res.status(200).send({ status: 200, Message: 'OK' });

export default defaultHandler;
export { repositoriesController };