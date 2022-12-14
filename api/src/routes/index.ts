import { NextFunction, Request, Response, Router } from 'express';

import userRoutes from './userRoutes';
import verifyToken from '../middlewares/auth';
import practitionerRoutes from './practitionerRoutes';

const router: Router = Router();

/**
 * get /api
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome to Practitioner app',
  });
});

router.use('/', userRoutes); // User router
router.use('/practitioner', verifyToken, practitionerRoutes); // Practitioner router

export default router;
