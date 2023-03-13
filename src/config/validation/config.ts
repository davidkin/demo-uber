import * as Joi from 'joi';

const configSchema = Joi.object({
  name: Joi.string().required(),
  version: Joi.string().required(),
  port: Joi.number().required(),
  database: Joi.object({
    host: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  })
});

export default configSchema;
