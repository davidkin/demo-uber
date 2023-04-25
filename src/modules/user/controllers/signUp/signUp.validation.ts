import * as Joi from 'joi';
import { type Request } from 'express';
import { type IValidationError } from '../../../../types';

export const signUpValidation = (req: Request): IValidationError => {
  const schema = Joi.object({
    body: Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(5).max(30).email().required(),
      password: Joi.string().min(5).max(1024).required(),
      status: Joi.array().min(1).items(Joi.string().valid('ADMIN', 'USER')).required()
    }).required()
  }).unknown(true);

  const error = schema.validate(req);

  return { error, message: error?.error?.details[0].message ?? '' };
}
