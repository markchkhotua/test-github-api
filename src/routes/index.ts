import { Router } from 'express';
import defaultHandler, { repositoriesController } from '../controllers';
import { routesConfig } from '../../config';
import { validateRequest } from '../middlewares/validateRequest';

const router: Router = Router();

router.get(routesConfig.root, defaultHandler);

router.get(routesConfig.repositories, validateRequest, repositoriesController);

export default router;
