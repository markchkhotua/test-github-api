import { Request, Response } from 'express';
import { repositoriesController } from './github';

export default (req: Request, res: Response) => res.status(200).send({ status: 200, Message: 'OK' });

export { repositoriesController };