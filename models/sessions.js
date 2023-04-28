'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate (models) {
            Session.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    Session.init({
        sid: DataTypes.STRING,
        userId: DataTypes.STRING,
        expires: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Sessions'
    });
    return Session;
};
