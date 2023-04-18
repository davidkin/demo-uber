import express from 'express';
import { type NextFunction, type Request, type Response } from 'express';
import logger from '../logger';
import userRoutes from './user/user.routes';
import sessionRoutes from './session/session.routes';

const routes = express.Router();

routes.get('/api/v1/ping', (req: Request, res: Response, next: NextFunction): any => {
  logger.info('Ping Check Request');
  res.status(200).json({ message: 'Pong!' });
});

routes.use('/api/v1/user', userRoutes)
routes.use('/api/v1/session', sessionRoutes)

export default routes;
