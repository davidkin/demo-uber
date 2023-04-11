import dotenv from 'dotenv';
import configSchema from './validation/config';
import { type ValidationResult } from 'joi';
import { type AppConfig } from './config.interface';

dotenv.config();

const readConfig = (): AppConfig => {
  const config: AppConfig = {
    name: 'demo-uber',
    port: 9000,
    version: '1.0.0',
    database: {
      name: process.env.DB_NAME ?? 'mydatabase',
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PSW ?? '',
      port: 5433
    },
    token: process.env.TOKEN_SECRET ?? '',
    refreshToken: process.env.TOKEN_REFRESH_SECRET ?? ''
  };

  const { error }: ValidationResult = configSchema.validate(config);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return config;
};

const config = readConfig();

export default config;
