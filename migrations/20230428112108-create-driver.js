'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('Drivers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING
            },
            number: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'id' }
            },
            city: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATE
            },
            countOfRides: {
                type: Sequelize.INTEGER
            },
            address: {
                type: Sequelize.STRING
            },
            postcode: {
                type: Sequelize.INTEGER
            },
            hasDisability: {
                type: Sequelize.BOOLEAN
            },
            disabilityInfo: {
                type: Sequelize.STRING
            },
            rate: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('Drivers');
    }
};
