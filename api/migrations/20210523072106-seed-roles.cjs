'use strict';

module.exports = {
  up: async (queryInterface) => {
    const roleNames = ['member', 'admin', 'companyAdmin'];
    const roles = roleNames.map((name) => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('roles', roles);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles');
  }
};
