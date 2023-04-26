import { type NextFunction, type Request, type Response } from 'express';
import { UserService } from '../../index';
import { TokenService } from '../../../../services/TokenService';
import { AuthorizedError, ValidationError } from '../../../../errors';
import { SessionService } from '../../../session';
import { loginValidation } from './login.validation';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, message } = loginValidation(req);

    if (error) {
      throw new ValidationError(message);
    }

    const { email, password } = req.body;

    const user = await UserService.getUserByPasswordAndEmail(email, password);

    if (!user) {
      throw new AuthorizedError('User could not be found');
    }

    const token = TokenService.createToken(user);
    const refreshToken = TokenService.createRefreshToken(user);

    const sessionExpiresDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

    const session = await SessionService.createSession({
      userId: user.id,
      expires: sessionExpiresDate
    });

    res.status(200).json({ message: 'Login was success', token, refreshToken, sessionId: session.sid });
  } catch (err) {
    next(err); // if we remove try/catch block, error message won't return to user
  }
}
