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
          foreignKey: "userId",
          otherKey: "roleId",
          onDelete: 'CASCADE'
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
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};