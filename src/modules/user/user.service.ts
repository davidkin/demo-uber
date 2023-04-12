import { UserRepo } from './index';
import { type IUser, type IUserInstance } from './type';

class UserService {
  static async getUserByEmail (email: string): Promise<IUserInstance | null> {
    return await UserRepo.getUserByEmail(email);
  }

  static async createUser (user: IUser): Promise<[IUserInstance, boolean]> {
    return await UserRepo.findOrCreate(user);
  }
}

export default UserService;
