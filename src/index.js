//sync sequelize instance && create server and implement process.env

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', 'config.env') });

// process.on("uncaughtException", (err) => {
//   console.log("uncaughtException => " + err);
//   process.exit(1);
// });

const { sequelize, server } = require('./app');
const port = process.env.PORT || 5000;

sequelize
  .sync({
    // logging: true,
    // alter: true,
    // force: true,
  })
  .then(() => {
    console.log(`Connected To DB Successfully`);
    server.listen(port, () => {
      console.log(`Application Started On Port ${port}`);
    });
  })
  .catch((err) => {
    console.log(
      `Error From Sequelize Promise || Then Executer (Promise Job || Microtasks Queue ${err}`
    );
  });

// process.on("unhandledRejection", (err) => {
//   console.log("unhandledRejection => " + err);
//   server.close(() => {
//     process.exit(1);
//   });
// });
