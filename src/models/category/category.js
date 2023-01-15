const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const Todo = require('../todo/todo');

//Another Approach is to use model.define
//but I use this approach instead of that
class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    timestamps: false,
  }
);

// One To Many Relation Between Category and Todo Tables
Category.hasMany(Todo, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
    type: DataTypes.BIGINT,
  },
});

Todo.belongsTo(Category, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
    type: DataTypes.BIGINT,
  },
});

module.exports = Category;
