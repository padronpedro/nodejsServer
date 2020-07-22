'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(
        models.Role,
        { 
          through: "RoleUsers",
          onDelete: 'CASCADE',
          hooks: true
        },
      );
    }
  };
  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
      email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};