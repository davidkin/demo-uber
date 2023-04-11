import express from 'express';
import { type NextFunction, type Request, type Response } from 'express';
import logger from '../logger';
import userRoutes from './user/user.routes';
import tokenRoutes from './token/token.routes';

const routes = express.Router();

routes.get('/ping', (req: Request, res: Response, next: NextFunction): any => {
  logger.info('Ping Check Request');
  res.status(200).json({ message: 'Pong!' });
});

routes.use('/api/user', userRoutes)
routes.use('/api/token', tokenRoutes)

export default routes;
