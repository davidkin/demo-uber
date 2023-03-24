import dotenv from 'dotenv';
import configSchema from './validation/config';
import { type ValidationResult } from 'joi';
import * as fs from 'fs';
import { type AppConfig } from './config.interface';

dotenv.config();

const readConfig = (): AppConfig => {
  const data = fs.readFileSync('./config.json');
  const config = JSON.parse(data.toString()) as AppConfig;

  const { error }: ValidationResult = configSchema.validate(config);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return config;
};

const config = readConfig();

export default config;
