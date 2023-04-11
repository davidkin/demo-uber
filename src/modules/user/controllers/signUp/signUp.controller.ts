import { type NextFunction, type Request, type Response } from 'express';
import EncryptionService from '../../../../services/EncryptionService';
import { type IUser, type IUserInstance } from '../../type';
import UserService from '../../user.service';
import AuthorizedError from '../../../../errors/AuthorizedError';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, role, password, email }: IUser = req.body;

  try {
    const hashedPw = await EncryptionService.encryptPassword(password);
    const [user, hasJustCreated]: [IUserInstance, boolean] =
      await UserService.createUser({ firstName, lastName, role, password: hashedPw, email });

    if (!hasJustCreated) {
      throw new AuthorizedError('User already exist');
    }

    const userResponse: Omit<IUser, 'password'> = {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email
    }

    res.status(200).json({ user: userResponse });
  } catch (err) {
    next(err);
  }
}

export { signUp }
