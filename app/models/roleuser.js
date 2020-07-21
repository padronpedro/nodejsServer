'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleUser.belongsTo(models.User, {foreignKey: 'userId'})
      RoleUser.belongsTo(models.Role, {foreignKey: 'roleId'})
    }
  };
  RoleUser.init({
    roleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleUser',
  });
  return RoleUser;
};