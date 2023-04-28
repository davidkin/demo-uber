'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate (models) {
            Rider.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    Rider.init({
        fullName: DataTypes.STRING,
        number: DataTypes.STRING,
        email: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        city: DataTypes.STRING,
        birthday: DataTypes.DATE,
        countOfRides: DataTypes.INTEGER,
        address: DataTypes.STRING,
        postcode: DataTypes.INTEGER,
        hasDisability: DataTypes.BOOLEAN,
        disabilityInfo: DataTypes.STRING,
        rate: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Rider'
    });
    return Rider;
};
