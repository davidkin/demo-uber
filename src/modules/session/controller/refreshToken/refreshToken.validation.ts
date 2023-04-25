import * as Joi from 'joi';
import { type Request } from 'express';
import { type IValidationError } from '../../../../types';

export const refreshTokenValidation = (req: Request): IValidationError => {
  const schema = Joi.object({
    body: Joi.object({
      refreshToken: Joi.string().required()
    }).required()
  }).unknown(true);

  const error = schema.validate(req);

  return { error, message: error?.error?.details[0].message ?? '' };
}
