import * as Joi from 'joi';

const configSchema = Joi.object({
  name: Joi.string().required(),
  version: Joi.string().required(),
  port: Joi.number().required(),
  database: Joi.object({
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  }),
  token: Joi.string().required(),
  refreshToken: Joi.string().required()
});

export default configSchema;
