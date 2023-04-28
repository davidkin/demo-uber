import { type NextFunction, type Request, type Response } from 'express';
import { requestContext } from '../store';

const httpLog = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', function () {
    const logger = requestContext.getStore().logger;
    logger.info(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next();
};

export default httpLog;
