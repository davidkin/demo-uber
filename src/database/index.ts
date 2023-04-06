import { Sequelize } from 'sequelize';
import config from '../config/config';

const database = new Sequelize(config.database.name, config.database.username, config.database.password, {
  host: 'localhost',
  dialect: 'postgres',
  port: config.database.port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log
});

export { database, Sequelize }
