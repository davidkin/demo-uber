import * as Joi from 'joi';

const configSchema = Joi.object({
  version: Joi.string().required(),
  port: Joi.string().required(),
  database: Joi.object({
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  }),
  token: Joi.string().required(),
  refreshToken: Joi.string().required(),
  tokenExpires: Joi.string().required(),
  refreshTokenExpires: Joi.string().required()
});

export default configSchema;
