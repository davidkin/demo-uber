import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  name: string;
  port: string;
  version: string;
  database?: {
    host: string;
    username: string;
    password: string;
    name: string;
  };
}

const readConfig = (): AppConfig => ({
  name: 'demo-uber',
  port: process.env.PORT ?? '8080',
  version: '1.0.0'
});

const config = readConfig();

export default config;
