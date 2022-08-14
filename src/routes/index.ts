import { Router } from 'express';
import defaultHandler from '../controllers';

const router: Router = Router();

router.get('/', defaultHandler);

export default router;
export { default as repositoriesRouter } from './repositories.routes';