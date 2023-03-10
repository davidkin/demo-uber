import { type NextFunction, type Request, type Response } from 'express';

const pingCheck = (req: Request, res: Response, next: NextFunction): any => {
  try {
    return res.status(200).json({ message: 'Pong!' });
  } catch (err) {
    next(err);
  }
}

export {
  pingCheck
};
