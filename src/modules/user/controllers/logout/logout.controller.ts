import { type NextFunction, type Request, type Response } from 'express';
import { ValidationError } from '../../../../errors';
import { SessionService } from '../../../session';

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { sessionId } = req.body;

  try {
    if (!sessionId) {
      throw new ValidationError('SessionId is undefined');
    }

    await SessionService.removeSession(sessionId);

    res.status(200).json({ message: `Session ${sessionId as string} was removed` })
  } catch (err) {
    next(err);
  }
}

export { logout };
