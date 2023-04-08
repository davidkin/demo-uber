import { type NextFunction, type Request, type Response } from 'express';
import UserService from '../../user.service';
import EncryptionService from '../../../../services/EncryptionService';
import { TokenService } from '../../../token';
import { type IUser } from '../../type';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await UserService.getUserByEmail(email);

    if (!user) {
      throw Error('User could not be found');
    }

    const isPasswordEqual = await EncryptionService.comparePassword(password, user.password);

    if (!isPasswordEqual) {
      throw Error('Wrong password');
    }

    const token = TokenService.createToken(user);

    res.status(200).json({ message: 'Login was success', token });
  } catch (err) {
    next(err);
  }
}

export { login }
