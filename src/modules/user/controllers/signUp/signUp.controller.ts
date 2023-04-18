import { type NextFunction, type Request, type Response } from 'express';
import EncryptionService from '../../../../services/EncryptionService';
import { type IUser } from '../../type';
import { UserService } from '../../index';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, role, password, email }: IUser = req.body;

  const hashedPw = await EncryptionService.encryptPassword(password);
  const user = await UserService.createUser({ firstName, lastName, role, password: hashedPw, email });

  res.status(200).json({ user });
}

export { signUp }
