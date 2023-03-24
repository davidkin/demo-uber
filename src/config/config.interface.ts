export interface AppConfig {
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
