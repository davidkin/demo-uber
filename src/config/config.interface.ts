export interface AppConfig {
  name: string;
  port: number;
  version: string;
  database: {
    username: string;
    password: string;
    name: string;
    port: number;
  };
}
