import { type Request, type Response } from 'express';
import { UserService } from '../../index';
import { TokenService } from '../../../../services/TokenService';
import { NotAuthorizedError, ValidationError } from '../../../../errors';
import { SessionService } from '../../../session';
import { loginValidation } from './login.validation';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error, message } = loginValidation(req);

  if (error) {
    throw new ValidationError(message);
  }

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
