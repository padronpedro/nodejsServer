const models = require("../models");
const User = models.User;
const Role = models.Role;
const Permission = models.Permission;
var bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };
  
// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };
  
// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };
  
// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

/**
 * Get user data
 * 
 * @param id number
 * 
 * @return JSON
 */
exports.getUser = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  User.findByPk(
      req.params.id,
      {
        attributes: ['id','name','email'],
        include: [
          {
            model: Role,
            attributes: ['id','name']
          },
          {
            model: Permission,
            attributes: ['id']
          }
        ]
      }
    )
    .then(user => {
      if(user){
        result.status = true
        result.data = user
      }else{
        result.message = 'User not found'
      }
      return res.status(200).send(result)
    })
    .catch((error) => {
      result.message = error
      return res.status(200).send(result)
    })
}

/**
 * Add User
 * 
 * @param id number 
 * @param name string 
 * @param email string
 * @param password string
 * 
 * @return JSON
 */
exports.addUser = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  User.findOrCreate(
    {
      where: {
        email: {
          [Op.eq]: req.body.params.email
        }
      },
      defaults: {
        name: req.body.params.name,
        email: req.body.params.email,
        password: bcrypt.hashSync(req.body.params.password, 8),
      }
    }
  )
  .then(([user, created]) => {
    if(created){
      user.setRoles(req.body.params.role_id).then(() => {})
      user.setPermissions(req.body.params.permissions).then(() => {})
      result.status = true
    }else{
      result.message = 'Email already exists'
    }
    res.status(200).send(result)
  })
}

/**
 * Update user data
 * 
 * @param id number 
 * @param name string 
 * @param email string
 * @param password string
 * 
 * @return JSON
 */
exports.updateUser = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  User.findByPk(req.params.id)
    .then(user => {
      user.update({
        name: req.body.params.name,
        email: req.body.params.email,
        password: (req.body.params.password === '12345678') ? user.password : bcrypt.hashSync(req.body.params.password, 8),
      })
      user.setRoles(req.body.params.role_id).then(() => {});
      user.setPermissions(req.body.params.permissions).then(() => {});
      result.status = true
      res.status(200).send(result)
    })
}

/**
 * Update user data
 * 
 * @param id number 
 * @param name string 
 * @param email string
 * @param password string
 * 
 * @return JSON
 */
exports.updateProfile = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  if (req.userId == req.body.params.id) {
    User.findByPk(req.body.params.id)
      .then(user => {
        user.update({
          name: req.body.params.name,
          email: req.body.params.email,
          password: (req.body.params.password === '12345678') ? user.password : bcrypt.hashSync(req.body.params.password, 8),
        })
        result.status = true
        res.status(200).send(result)
      })
  }else{
    result.message = 'You cannot modify this profile'
    res.status(200).send(result)
  }
}

/**
 * Delete a user
 * 
 * @param id number 
 * 
 * @return JSON
 */
exports.deleteUser = (req,res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      if(!user){
        return res.status(200).send(result);
      }
      result.status = true
      return res.status(200).send(result);
    })
    .catch(error => {
      result.message = error
      return res.status(200).send(result);
    })
}

/**
 * Change user status
 * 
 * @param id number 
 * 
 * @return JSON 
 */
exports.changeStatus = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  
  User.findByPk(req.body.params.id)
  .then(user => {
    if(!user){
      return res.status(200).send(result);
    }
    user.update({
      is_active: user.is_active ? 0 : 1
    })
    .then(updated => {
      result.status = true;
      return res.status(200).send(result);
    })
    .catch(error => {
      result.message = error
      return res.status(200).send(result);
    })
  })
}

/**
 * Get users for the data table.
 *
 * @param orderCol string
 * @param sortDesc string
 * @param limit number
 * @param offset number
 *
 * @return json
 */
exports.getUsersForDataTable = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  let orderCol = (req.query.sortBy) ? req.query.sortBy : 'name' ;
  let sortDesc = (req.query.sortDesc) ? req.query.sortDesc : 'asc' ;
  let limit = req.query.limit ? Number(req.query.limit) : 10; 
  let offset = req.query.offset ? ((Number(req.query.offset)-1) * limit) : 0;

  User.findAndCountAll({
    attributes: ['id','name','email','is_active'],
    limit: limit,
    offset: offset,
    order: [
      [orderCol, sortDesc]
    ],
    include: [{
      model: Role,
      required: true,
      attributes: ['name']
    }]
  })
  .then(
    users => {
      result.data = users;
      result.status = true;
      return res.status(200).send(result);
    }
  )
  .catch(err => {
    result.message = err.message;
    return res.status(200).send(result);
  });  
};

