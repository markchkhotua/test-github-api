import { Router } from 'express';
import defaultHandler, { githubController } from '../controllers';
import { validateRequestMiddlewares } from '../middlewares';

const router: Router = Router();

router.get('/', defaultHandler);

router.get('/repositories/:entityType/:entityName', validateRequestMiddlewares, githubController);

export default router;
export { default as repositoriesRouter } from './repositories.routes';