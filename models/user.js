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
      User.hasMany(models.Task, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({ 
    id:  {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      type: DataTypes.UUID
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  //   User.associate((models) => {
  //   User.hasMany(models.Task, {
  //     foreignKey: 'user_id'
  //   });
  // })
  return User;
};