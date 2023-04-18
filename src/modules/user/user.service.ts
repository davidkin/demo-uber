import { UserRepo } from './index';
import { type IUser, type IUserInstance } from './type';
import EncryptionService from '../../services/EncryptionService';
import { NotAuthorizedError } from '../../errors';

class UserService {
  static async getUserByPasswordAndEmail (email: string, password: string): Promise<IUserInstance | null> {
    const user = await UserRepo.getUserByPasswordAndEmail(email, password) as IUserInstance;
    const isPasswordEqual = await EncryptionService.comparePassword(password, user.password);

    if (!isPasswordEqual) {
      throw new NotAuthorizedError('Wrong password');
    }

    return user;
  }

  static async createUser (user: IUser): Promise<[IUserInstance, boolean]> {
    return await UserRepo.findOrCreate(user);
  }
}

export default UserService;
