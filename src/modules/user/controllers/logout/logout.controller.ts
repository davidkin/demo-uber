import { type Request, type Response } from 'express';
import { ValidationError } from '../../../../errors';
import { SessionService } from '../../../session';
import { logoutValidation } from './logout.validation';

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { error, message } = logoutValidation(req.body);

  if (error) {
    throw new ValidationError(message);
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    throw new ValidationError('SessionId is undefined');
  }

  await SessionService.removeSession(sessionId);

  res.status(200).json({ message: `Session ${sessionId as string} was removed` })
}
