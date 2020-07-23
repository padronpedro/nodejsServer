'use strict';

var bcrypt = require('bcryptjs')
const faker = require('faker');
const db = require('../models')
const User = db.User
const Role = db.Role
const Permission = db.Permission
const Sequelize = require('sequelize');

const users = [...Array(15)].map((user) => (
  {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(8)
  }
))

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
      return queryInterface.bulkDelete('Users', {}, { truncate: true })
    })
    .then(function(result){
        return queryInterface.bulkInsert('Users', [{
          name: 'a',
          password: bcrypt.hashSync('a', 8),
          email: 'a@a.com'
        }]);
    })
    .then(function(result){
      return User.findByPk(1)
        .then(user => {
          Role.findByPk(2)
            .then(thisRole => {
              user.setRoles(thisRole).then(()=>{})
            })
          return user
        })
        .then((user) => {
          Permission.findAll()
          .then(allPermissions => {
            user.setPermissions(allPermissions).then(()=>{})
          })
        })
        .catch((err)=>{
          console.log(err)
        })
    })
    .then(function(result){
      return queryInterface.bulkInsert('Users', users);   
    })
    .then(function(){
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
