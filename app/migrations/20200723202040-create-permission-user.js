'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PermissionUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PermissionId: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'Permissions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PermissionUsers');
  }
};