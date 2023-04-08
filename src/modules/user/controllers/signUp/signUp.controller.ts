import { type NextFunction, type Request, type Response } from 'express';
import EncryptionService from '../../../../services/EncryptionService';
import { type IUser, type IUserInstance } from '../../type';
import UserService from '../../user.service';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, role, password, email }: IUser = req.body;

  try {
    const hashedPw = await EncryptionService.encryptPassword(password);
    const user: IUserInstance = await UserService.createUser({ firstName, lastName, role, password: hashedPw, email })

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

export { signUp }
