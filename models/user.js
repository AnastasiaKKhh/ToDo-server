'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasMany(models.Task, {
      //   foreignKey: 'user_id',
      // });
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