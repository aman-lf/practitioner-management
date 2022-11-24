import * as practitionerService from '../services/practitionerService';
import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

import validate from '../utils/validate';

// Validation schema
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().allow(null, ''),
  contact: Joi.string().allow(null, ''),
  dob: Joi.date().allow(null, ''),
  working_day: Joi.string().allow(null, ''),
  start_time: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .allow(null, ''),
  end_time: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .allow(null, ''),
  is_specialist: Joi.number().allow(null, ''),
  photo: Joi.any().allow(null, ''),
  specialization: Joi.string().allow(null, ''),
});

/**
 * Validate create/update practitioner request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function practitionerValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  console.log(req.body);
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate whether practitioner with given id exists.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findPractitioner(req: Request, res: Response, next: NextFunction): Promise<void> {
  return practitionerService
    .getPractitionerById(+req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { practitionerValidator, findPractitioner };
