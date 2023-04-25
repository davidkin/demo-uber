import { type Request, type Response } from 'express';
import { UserService } from '../../index';
import { TokenService } from '../../../../services/TokenService';
import { NotAuthorizedError } from '../../../../errors';
import { SessionService } from '../../../session';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await UserService.getUserByPasswordAndEmail(email, password);

  if (!user) {
    throw new NotAuthorizedError('User could not be found');
  }

  const token = TokenService.createToken(user);
  const refreshToken = TokenService.createRefreshToken(user);

  const sessionExpiresDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

  const session = await SessionService.createSession({
    userId: user.id,
    expires: sessionExpiresDate
  });

  res.status(200).json({ message: 'Login was success', token, refreshToken, sessionId: session.sid });
}
