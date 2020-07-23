'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    .then(() => {
      return queryInterface.bulkDelete('PermissionUsers', {}, { truncate: true })
    })
    .then(() => {
      return queryInterface.bulkDelete('Permissions', {}, { truncate: true })
    })
    .then(() => {
      return queryInterface.bulkInsert('Permissions',[
        {
          name: 'AddUsers'
        },
        {
          name: 'EditUsers'
        },
        {
          name: 'DeleteUsers'
        },
        {
          name: 'ManageUsers'
        },
      ])
    }).then(function(){
      return queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    })
    .catch((error) => {
      console.log(error)
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Permissions', null, {})
  }
};
