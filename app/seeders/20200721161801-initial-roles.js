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
    .then(function(result){
      return queryInterface.bulkDelete('RoleUsers', {}, { truncate: true })
    })
    .then(function(result){
      return queryInterface.bulkDelete('Roles', {}, { truncate: true })
    })
    .then(function(result){
      return queryInterface.bulkInsert('Roles', [
        {
          id: 1,
          name: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);

    }).then(function(){
      return queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }).catch(function(err){
      console.log(err.message);
    });    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
