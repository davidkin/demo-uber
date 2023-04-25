import { type Request, type Response } from 'express';
import { ValidationError } from '../../../../errors';
import { SessionService } from '../../../session';

const logout = async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new ValidationError('SessionId is undefined');
  }

  await SessionService.removeSession(sessionId);

  res.status(200).json({ message: `Session ${sessionId as string} was removed` })
}

export { logout };
