'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Creating seeder user...');

    await queryInterface.context.bulkInsert('Users', [{
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};