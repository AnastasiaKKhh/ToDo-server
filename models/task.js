'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Task.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      // })
    }
  }
  Task.init({
    name: DataTypes.STRING,
    uuid:  {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      type: DataTypes.UUID
    },
    done: {
      defaultValue: false,
      type:DataTypes.BOOLEAN 
    },
    user_id: {
      type: DataTypes.UUID,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks'
  });
  //  Task.associate((models) => {
  //   Task.belongsTo(models.User, {
  //     foreignKey: 'user_id'
  //   })
  // })
  return Task;
};