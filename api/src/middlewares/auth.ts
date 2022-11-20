import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import logger from '../utils/logger';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Verifying User');

  const bearerToken = req.headers['authorization'];

  if (typeof bearerToken !== 'undefined') {
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
      if (!err) next();
      else next(Boom.unauthorized('Invalid token'));
    });
  } else {
    next(Boom.forbidden('Invalid token'));
  }
};

export default verifyToken;
