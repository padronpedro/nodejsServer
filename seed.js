const models = require('./app/models');
const User = models.User;
const Role = models.Role;
const Permission = models.Permission;
const RoleUsers = models.RoleUsers;
var bcrypt = require('bcryptjs')

const Sequelize = require('sequelize');
const Op = Sequelize.Op
var allPermissions = []

User.findAll({
    where: {
      id: {
        [Op.gte]: 2
      }
    }
  })
  .then(users => {   
    users.forEach(function (user) {
        Role.findByPk(1)
            .then(thisRole => {
              user.setRoles(thisRole).then(()=>{})
            })
            .catch((err)=>{
            console.log(err)
            })
        })
    return users
  })      
  .then(users => {
    Permission.findAll().then((auxPermissions)=>{
      users.forEach(function (user) {
        user.setPermissions(auxPermissions).then(()=>{})
      })
    })
  })
  .catch((err)=>{
    console.log(err)
  })
