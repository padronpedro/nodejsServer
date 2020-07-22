'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RoleUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RoleId: {
        type: Sequelize.INTEGER,
        references: {         // User hasMany WorkingDays n:n
          model: 'Roles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {         // User hasMany WorkingDays n:n
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoleUsers');
  }
};