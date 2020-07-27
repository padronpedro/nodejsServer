const models = require("../models");
const Permission = models.Permission;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

/**
 * Get Roles
 * 
 * @return JSON
 */
exports.getPermissions = (req,res) => {
    let result = {
      status: false,
      message: '',
      data: ''
    }
  
    Permission.findAll({
      attributes: ['id','name']
    })
    .then(roles => {
      result.status = true
      result.data = roles
      return res.status(200).send(result)
    })
  }