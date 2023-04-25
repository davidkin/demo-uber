import { UserRepo } from './user.repo';
import { type IUser, type IUserInstance } from './type';
import { EncryptionService } from '../../services/EncryptionService';
import { NotAuthorizedError } from '../../errors';
import AuthorizedError from '../../errors/AuthorizedError';

class UserService {
  static async getUserByPasswordAndEmail (email: string, password: string): Promise<IUserInstance | null> {
    const user = await UserRepo.getUserByPasswordAndEmail(email, password) as IUserInstance;
    const isPasswordEqual = await EncryptionService.comparePassword(password, user.password);

    if (!isPasswordEqual) {
      throw new NotAuthorizedError('Wrong password');
    }

    return user;
  }

  static async createUser (user: IUser): Promise<Omit<IUser, 'password'>> {
    const hashedPw = await EncryptionService.encryptPassword(user.password);

    const [newUser, hasJustCreated]: [IUserInstance, boolean] = await UserRepo.findOrCreate({ ...user, password: hashedPw });

    if (!hasJustCreated) {
      throw new AuthorizedError('User already exist');
    }

    return {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      status: newUser.status
    };
  }
}

export default UserService;
