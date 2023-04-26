import * as Joi from 'joi';
import { type Request } from 'express';
import { type IValidationError } from '../../../../types';

export const logoutValidation = (req: Request): IValidationError => {
  const schema = Joi.object({
    body: Joi.object({
      sessionId: Joi.number()
    }).required()
  }).unknown(true);

  const error = schema.validate(req);

  return { error: error?.error, message: error?.error?.details[0].message ?? '' };
}
