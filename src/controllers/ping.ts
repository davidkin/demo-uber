import { type NextFunction, type Request, type Response } from 'express';
import logger from '../logger';

const pingCheck = (req: Request, res: Response, next: NextFunction): any => {
  logger.info('Ping Check Request');
  res.status(200).json({ message: 'Pong!' });
}

export {
  pingCheck
};
