'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'example@example.com',
            status: ['admin'],
            password: '12345',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Users', { [Op.eq]: { email: 'example@example.com' } }, {});
    }
};
