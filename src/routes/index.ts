import { Router } from 'express';
import defaultHandler, { repositoriesController } from '../controllers';
import { validateRequest } from '../middlewares/validateRequest';

const router: Router = Router();

router.get('/', defaultHandler);

router.get('/repositories/:entityType/:entityName', validateRequest, repositoriesController);

export default router;
