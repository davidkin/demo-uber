import dotenv from 'dotenv';
import configSchema from './validation/config';
import { type ValidationResult } from 'joi';
import { type AppConfig } from './config.interface';
import * as pjson from '../../package.json';

dotenv.config();

const readConfig = (): AppConfig => {
  const config: AppConfig = {
    port: process.env.PORT ?? '9000',
    version: pjson.version,
    database: {
      name: process.env.DB_NAME ?? 'mydatabase',
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PSW ?? '',
      port: Number(process.env.DB_PORT)
    },
    token: process.env.TOKEN_SECRET ?? '',
    tokenExpires: '3h',
    refreshToken: process.env.TOKEN_REFRESH_SECRET ?? '',
    refreshTokenExpires: '5h'
  };

  const { error }: ValidationResult = configSchema.validate(config);

  if (error) {
    console.error(error);
    throw new Error('Config validation error');
  }

  return config;
};

const config = readConfig();

export default config;
