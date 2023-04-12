import { type NextFunction, type Request, type Response } from 'express';
import { UserService } from '../../index';
import EncryptionService from '../../../../services/EncryptionService';
import TokenService from '../../../../services/TokenService';
import { type IUser } from '../../type';
import { NotAuthorizedError } from '../../../../errors';
import { SessionService } from '../../../session';
import { v4 as uuidv4 } from 'uuid';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await UserService.getUserByEmail(email);

    if (!user) {
      throw new NotAuthorizedError('User could not be found');
    }

    const isPasswordEqual = await EncryptionService.comparePassword(password, user.password);

    if (!isPasswordEqual) {
      throw new NotAuthorizedError('Wrong password');
    }

    const token = TokenService.createToken(user);
    const refreshToken = TokenService.refreshToken(user);

    const sessionId = uuidv4();
    const sessionExpiresDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

    const session = await SessionService.createSession({
      sid: sessionId,
      userId: user.id,
      expires: sessionExpiresDate,
      data: JSON.stringify(token)
    });

    res.status(200).json({ message: 'Login was success', token, refreshToken, sessionId: session.sid });
  } catch (err) {
    next(err);
  }
}

export { login }
