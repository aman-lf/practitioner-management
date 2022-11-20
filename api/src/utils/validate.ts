import Joi from '@hapi/joi';
import isEmpty from 'lodash/isEmpty';

/**
 * Utility helper for Joi validation.
 *
 * @param   {object}  data
 * @param   {Joi}  schema
 * @returns {Promise}
 */
function validate(data: object, schema: Joi): Promise<object> {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (!isEmpty(error)) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
}

export default validate;
