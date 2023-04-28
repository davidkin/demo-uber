import { type Request, type Response } from 'express';
import { type IUser } from '../../type';
import { UserService } from '../../index';
import { signUpValidation } from './signUp.validation';
import { ValidationError } from '../../../../errors';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { error, message } = signUpValidation(req);

  if (error) {
    throw new ValidationError(message);
  }

  const { firstName, lastName, password, email, status }: IUser = req.body;

  const user = await UserService.createUser({ firstName, lastName, password, email, status });

  res.status(200).json({ user });
}
