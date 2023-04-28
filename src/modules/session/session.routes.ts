import express, { type Router } from 'express';
import * as SessionControllers from './controller';

export const initRoutes = (globalRouter: Router): void => {
  const routes = express.Router();

  routes.post('/refreshToken', SessionControllers.refreshToken);

  globalRouter.use('/session', routes);
}
