import { DataTypes } from 'sequelize';
import { database } from '../../database';
import { type IUserInstance } from './type';

const UserModel = database.define<IUserInstance>('User', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['admin']
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
})

export default UserModel;
