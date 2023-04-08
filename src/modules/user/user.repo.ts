import UserModel from './user.model';
import { type IUser, type IUserInstance } from './type';

class UserRepo {
  static async getUserByEmail (email: string): Promise<IUserInstance | null> {
    return await UserModel.findOne({ where: { email } });
  }

  static async createUser (user: IUser): Promise<IUserInstance> {
    return await UserModel.create(user)
  }
}

export default UserRepo;
