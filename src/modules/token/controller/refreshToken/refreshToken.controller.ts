import { type NextFunction, type Request, type Response } from 'express';
import { NotAuthorizedError } from '../../../../errors';
import { type IUser } from '../../../user/type';
import { TokenService } from '../../index';
import config from '../../../../config/config';
import UserService from '../../../user/user.service';

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new NotAuthorizedError('Refresh Token wasn\'t provided');
    }

    const decodedUser: IUser = TokenService.verifyToken(refreshToken, config.refreshToken);
    const user: IUser | null = await UserService.getUserByEmail(decodedUser.email);

    if (!user) {
      throw new NotAuthorizedError('User not found');
    }

    const accessToken = TokenService.createToken(user);

    res.status(200).json({ message: 'Login was success', accessToken });
  } catch (err) {
    next(err);
  }
}
export { refreshToken }
