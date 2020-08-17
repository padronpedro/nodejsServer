const models = require('../models');
const config = require("../config/auth.config");
const User = models.User;
const Role = models.Role;

const Op = models.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  let result = {
    id: '',
    name: '',
    email: '',
    roles: '',
    permissions: '',
    accessToken: null
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!user.is_active) {
        return res.status(401).send({ message: "User inactive" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        // expiresIn: '10s' // 24 hours
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      var permissionList = [];

      user.getRoles()
      .then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
      })
      .then(() => {
        user.getPermissions()
        .then(permission => {
          for (let i = 0; i < permission.length; i++) {
            permissionList.push(permission[i].name.toUpperCase());
          }
          result.id = user.id
          result.name = user.name
          result.email = user.email
          result.roles = authorities
          result.permissions = permissionList
          result.accessToken = token
    
          res.status(200).send(result);
        })  
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};