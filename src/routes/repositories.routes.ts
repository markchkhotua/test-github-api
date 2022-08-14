import { Router } from 'express';
import { githubController } from '../controllers';
import { validateRequestMiddlewares } from '../middlewares';

const router: Router = Router();

router.get('/github/:entityName', validateRequestMiddlewares, githubController);

export default router;
