import express, { type Router } from 'express';
import passport from 'passport';
import * as LiveOpsControllers from './controller';

export const initRoutes = (globalRouter: Router): void => {
  const routes = express.Router();

  routes.get('/ping', passport.authenticate('jwt', { session: false }), LiveOpsControllers.ping);

  globalRouter.use('/liveops', routes);
}
