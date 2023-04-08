import UserRepo from './user.repo';
import { type IUser, type IUserInstance } from './type';

class UserService {
  static async getUserByEmail (email: string): Promise<IUserInstance | null> {
    return await UserRepo.getUserByEmail(email);
  }

  static async createUser (user: IUser): Promise<IUserInstance> {
    return await UserRepo.createUser(user);
  }
}

export default UserService;
