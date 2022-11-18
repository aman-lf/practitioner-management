import { NextFunction, Request, Response, Router } from 'express';

import userRoutes from './userRoutes';
import * as userController from '../controllers/userController';

const router: Router = Router();

/**
 * get /api/
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome to Practitioner app',
  });
});

router.use('/', userRoutes); // User router

export default router;
