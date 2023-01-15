const helmet = require('helmet');
const http = require('http');
const express = require('express');
const sequelize = require('./db/sequelize');
const routers = require('./routers');
const globalErrHandler = require('./appError/globalErrHandler');

const app = express();

const server = http.createServer(app);

//Helmet MiddleWare
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Handle CORS Policy Without Extra Third-Party Libray
//It Only AAccepts Request From localhost:3000 , Other Origins Refuse
app.use((req, res, next) => {
  if (req.headers.origin == 'http://localhost:3000') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//Use express.json As a Middleware To Parse Data
//Usage is The Same As BodyParser
app.use(
  express.json({
    limit: '10mb',
  })
);

//Loop in routers.js file and Execute Files
for (let router of routers) {
  app.use(router);
}

//Use a global error handler which is Placed in "/src/appError/globalErrHandler.js"
//and catch errors from sequelize and other like syntaxError and ...
app.use(globalErrHandler);

//export sequelize and server to use them in index.js
//the goal is create server and sync sequelize in index.js
//and take apart index.js to sequelize.js (directly)
module.exports = {
  sequelize,
  server,
};
