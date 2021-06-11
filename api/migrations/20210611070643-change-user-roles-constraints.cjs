'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
          'userRoles',
          'userRoles_ibfk_2',
          { transaction }
      );
      await queryInterface.changeColumn('userRoles', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true
      }, { transaction });
      await queryInterface.addConstraint('userRoles',{
        fields: ['userId'],
        type: 'foreign key',
        name: 'userRoles_ibfk_2',
        references: {
          table: 'users',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
          'userRoles',
          'userRoles_ibfk_2',
          { transaction }
      );
      await queryInterface.changeColumn('userRoles', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false
      }, { transaction });
      await queryInterface.addConstraint('userRoles',{
        fields: ['userId'],
        type: 'foreign key',
        name: 'userRoles_ibfk_2',
        references: {
          table: 'users',
          field: 'id',
        },
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
