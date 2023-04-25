import express from 'express';
import * as UserControllers from './controllers';

export const initRoutes = (globalRouter: express.Router): void => {
  const routes = express.Router();

  routes.post('/login', UserControllers.login);
  routes.post('/signUp', UserControllers.signUp);
  routes.post('/logout', UserControllers.logout);

  globalRouter.use('/user', routes);
};
