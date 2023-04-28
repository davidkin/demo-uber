'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate (models) {
            Car.belongsTo(models.Driver, { foreignKey: 'driverId' });
        }
    }
    Car.init({
        model: DataTypes.STRING,
        type: DataTypes.STRING,
        number: DataTypes.STRING,
        mileage: DataTypes.INTEGER,
        accident: DataTypes.STRING,
        driverId: DataTypes.INTEGER,
        color: DataTypes.STRING,
        lastDateOfTechnicalService: DataTypes.DATE,
        class: DataTypes.ARRAY,
        lastRentalDay: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Car'
    });
    return Car;
};
