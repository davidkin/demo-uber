import { UserModel } from './index';
import { type IUser, type IUserInstance } from './type';

class UserRepo {
  static async getUserByPasswordAndEmail (email: string, password: string): Promise<IUserInstance | null> {
    return await UserModel.findOne({ where: { email, password } });
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
