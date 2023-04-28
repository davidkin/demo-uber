import * as Joi from 'joi';
import { type Request } from 'express';
import { type IValidationError } from '../../../../types';

export const loginValidation = (req: Request): IValidationError => {
  const schema = Joi.object({
    body: Joi.object({
      email: Joi.string().min(5).max(30).email().required(),
      password: Joi.string().min(5).max(1024).required()
    }).required()
  }).unknown(true);

  const error = schema.validate(req);

  return { error: error?.error, message: error?.error?.details[0].message ?? '' };
}
