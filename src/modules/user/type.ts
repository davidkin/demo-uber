import { type Model, type Optional } from 'sequelize';
import type * as Joi from 'joi';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  status: string[];
  password: string;
  email: string;
}

export interface IUserInstance extends Model<Optional<IUser, 'id'>>, IUser {
  createdAt?: Date;
  updatedAt?: Date;
}
