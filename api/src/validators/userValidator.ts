import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

import validate from '../utils/validate';

// Validation schema
const schema = Joi.object({
  email: Joi.string().email().label('email').required(),
  password: Joi.string().label('password').required(),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

export { userValidator };
