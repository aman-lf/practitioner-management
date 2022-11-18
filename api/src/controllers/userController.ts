import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import * as userService from '../services/userService';

/**
 * Get all users
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Create user
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Generates a hash for the password
  bcrypt.hash(password, 10, (err, hash) => {
    userService
      .createUser({ email, password: hash })
      .then((data) => res.status(HttpStatus.CREATED).json(data))
      .catch((error) => next(error));
  });
};

/**
 * Login user
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userService
    .loginUser(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
