const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

//Another Approach is to use model.define
//but I use this approach instead of that
class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['done', 'pending'],
    },
  },
  {
    sequelize,
    modelName: 'Todo',
  }
);

module.exports = Todo;
