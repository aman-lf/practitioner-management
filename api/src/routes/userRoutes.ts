import { Router } from 'express';

import * as userController from '../controllers/userController';

const router = Router();

/**
 * post /api/signup
 */
router.post('/signup', userController.createUser);

/**
 * post /api/signin
 */
router.post('/signin', userController.userLogin);

/**
 * get /api/users
 */
router.get('/users', userController.getAllUsers);

export default router;
