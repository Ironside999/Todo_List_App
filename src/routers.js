// Do It To Prevent Bunch Of app.use(......) Middleware
//I Use it in app.js in a for ... of loop and use from every single route as a middleware

let routers = [
  require('./routes/todo/todo'),
  require('./routes/category/category'),
];

module.exports = routers;
