import express, { type NextFunction, type Request, type Response } from 'express';
import logger from '../logger';

const routes = express.Router();

routes.get('/ping', (req: Request, res: Response, next: NextFunction): any => {
  logger.info('Ping Check Request');
  res.status(200).json({ message: 'Pong!' });
});

export default routes;
