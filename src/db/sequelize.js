const { Sequelize, Op } = require('sequelize');

//Create an Instance Of Sequelize and Export it
//Use This instance in app.js and export it to index.js from app.js
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
    logging: false,
    define: {
      charset: process.env.SEQUELIZE_CHARSET,
      dialectOptions: {
        collate: process.env.SEQUELIZE_COLLATE,
      },
    },
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  }
);

module.exports = sequelize;
