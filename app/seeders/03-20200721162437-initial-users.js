'use strict';

var bcrypt = require('bcryptjs')
const faker = require('faker');
const db = require('../models')
const User = db.User
const Role = db.Role
const Permission = db.Permission
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const users = [...Array(5)].map((user) => (
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

    await queryInterface.bulkDelete('Users', {}, { truncate: true })

    await queryInterface.bulkInsert('Users', [{
          name: 'a',
          password: bcrypt.hashSync('a', 8),
          email: 'a@a.com'
        }]);

    await queryInterface.bulkInsert('Users', users);   

    const allPermissions = await Permission.findAll().then()

    await User.findByPk(1)
        .then(user => {          
          return Role.findByPk(2)
            .then(thisRole => {
              user.setRoles(thisRole).then(()=>{})
              return user
            })
        })
        .then(user => {
          return user.setPermissions(allPermissions).then(()=>{ 
            return true
          })
        })
    
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

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
