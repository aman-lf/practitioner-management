import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { UserToCreate } from '../interfaces/userInterface';

/**
 * Get all users
 * @returns Promise
 */
export const getAllUsers = async (): Promise<Object> => {
  return User.getAllUsers().then((users) => ({
    data: users,
    message: 'Successfully retrieved all users',
  }));
};

/**
 * Create user
 * @param  {UserToCreate} user
 * @returns Promise
 */
export const createUser = async (user: UserToCreate): Promise<object> => {
  return User.createUser(user)
    .then(() => ({
      data: [],
      message: 'Successfully created a user.',
    }))
    .catch((err) => {
      if ((err.code = 'ER_DUP_ENTRY')) throw Boom.conflict('Duplicate email');
      throw err;
    });
};

/**
 * Logs in a user and send the JWT token
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
export const loginUser = async (email: string, password: string): Promise<Object> => {
  return User.getUserByEmail(email).then((user) => {
    if (user) {
      // Check if password match
      const isCorrect = bcrypt.compareSync(password, user.password);

      if (isCorrect) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);

        return {
          data: { accessToken, refreshToken, user },
          message: 'Logged in successfully',
        };
      }
    }

    // Throw error if email or password incorrect
    throw Boom.notFound('Email or Password incorrect');
  });
};
