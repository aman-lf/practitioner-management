import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome to Practitioner app',
  });
});

export default router;
