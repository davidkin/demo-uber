import { DataTypes } from 'sequelize';
import { database } from '../../database';

const SessionModel = database.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userId: DataTypes.STRING,
  expires: DataTypes.DATE
})

export default SessionModel;
