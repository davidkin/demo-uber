import UserModel from './user.model';
import { type IUser, type IUserInstance } from './type';

class UserRepo {
  static async getUserByEmail (email: string): Promise<IUserInstance | null> {
    return await UserModel.findOne({ where: { email } });
  }

  static async findOrCreate (user: IUser): Promise<[IUserInstance, boolean]> {
    const [newUser, isCreated] = await UserModel.findOrCreate({
      where: { email: user.email },
      defaults: user
    });

    return [newUser, isCreated];
  }
}

export default UserRepo;
