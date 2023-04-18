import { type NextFunction, type Request, type Response } from 'express';
import { type IUser } from '../../type';
import { UserService } from '../../index';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, role, password, email }: IUser = req.body;

  const user = await UserService.createUser({ firstName, lastName, role, password, email });

  res.status(200).json({ user });
}

export { signUp }
