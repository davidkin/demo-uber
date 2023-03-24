import { type NextFunction, type Request, type Response } from 'express';
import logger from '../logger';

const httpLog = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', function () {
    logger.info(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next();
};

export default httpLog;
