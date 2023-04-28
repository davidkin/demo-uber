import { UserRepo } from './user.repo';
import { type IUser, type IUserInstance } from './type';
import { EncryptionService } from '../../services/EncryptionService';
import { AuthorizedError } from '../../errors';

class UserService {
  static async getUserByPasswordAndEmail (email: string, password: string): Promise<IUserInstance | null> {
    const user = await UserRepo.getUserByEmail(email) as IUserInstance;
    const isPasswordEqual = await EncryptionService.comparePassword(password, user.password);

    if (!isPasswordEqual) {
      throw new AuthorizedError('Wrong password');
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
      email: newUser.email,
      status: newUser.status
    };
  }
}

export default UserService;
