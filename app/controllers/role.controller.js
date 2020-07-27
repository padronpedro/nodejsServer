const models = require("../models");
const Role = models.Role;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

/**
 * Get Roles
 * 
 * @return JSON
 */
exports.getRoles = (req,res) => {
    let result = {
      status: false,
      message: '',
      data: ''
    }
  
    Role.findAll({
      attributes: ['id','name']
    })
    .then(roles => {
      result.status = true
      result.data = roles
      return res.status(200).send(result)
    })
  }