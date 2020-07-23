'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PermissionUser.init({
    PermissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Model.Permission,
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: Model.User,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'PermissionUser',
  });
  return PermissionUser;
};