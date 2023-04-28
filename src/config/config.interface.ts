export interface AppConfig {
  port: string;
  version: string;
  database: {
    username: string;
    password: string;
    name: string;
    port: number;
  };
  token: string;
  refreshToken: string;
  tokenExpires: string;
  refreshTokenExpires: string;
}
