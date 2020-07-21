'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(
        models.User,
        { 
          through: "RoleUsers",
          foreignKey: "roleId",
          otherKey: "userId",
          onDelete: 'CASCADE'
        }
      );
    }
  };
  Role.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};