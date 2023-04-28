import { type Model, type Optional } from 'sequelize';

export interface IUser {
  id?: number;
  status: string[];
  password: string;
  email: string;
}

export interface IUserInstance extends Model<Optional<IUser, 'id'>>, IUser {
  createdAt?: Date;
  updatedAt?: Date;
}
