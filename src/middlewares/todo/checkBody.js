//This MiddleWare Prevent The Call Of Create TODO Without "title" in Body Request
// it can work instead of <<allowNull: false>> in Todo Model

const AppError = require('../../appError/appError');

module.exports = (req, res, next) => {
  if (req) {
    console.log('req is here');
  }
  if (!req.body?.title) {
    return next(new AppError('You Should Provide title in body request', 400));
  }
  next();
};

/*
    USAGE:
    1. Comment allowNull: false in Todo model
    2. Write This Middleware Function
    3. Import It in Todo Route
    4. Use it Without () as an Argument in router.post() like this
    router.post('/api/todo', checkBody, catchAsync(async(req, res, next)) => {...})
*/
