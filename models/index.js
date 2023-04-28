'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const { User } = require('./user');
const { Sessions } = require('./sessions');
const { Driver } = require('./driver');
const { Rider } = require('./rider');
const { Car } = require('./car');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User;
db.Sessions = Sessions;
db.Driver = Driver;
db.Rider = Rider;
db.Car = Car;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
