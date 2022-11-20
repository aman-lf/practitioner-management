import { Router } from 'express';

import { userValidator } from '../validators/userValidator';
import * as userController from '../controllers/userController';

const router = Router();

/**
 * post /api/signup
 */
router.post('/signup', userValidator, userController.createUser);

/**
 * post /api/signin
 */
router.post('/signin', userValidator, userController.userLogin);

/**
 * get /api/users
 */
router.get('/users', userController.getAllUsers);

export default router;
