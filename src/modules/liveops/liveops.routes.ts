import express, { type Router } from 'express';
import * as LiveOpsControllers from './controller';

export const initRoutes = (globalRouter: Router): void => {
  const routes = express.Router();

  routes.post('/ping', LiveOpsControllers.ping);

  globalRouter.use('/liveops', routes);
}
