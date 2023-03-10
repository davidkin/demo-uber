import { type NextFunction, type Request, type Response } from 'express';

const httpLog = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', function () {
    console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next();
};

export default httpLog;
