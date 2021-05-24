'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', {
      type: 'UNIQUE',
      fields: ['email'],
      name: 'unique_user_email',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'unique_user_email')
  }
};
