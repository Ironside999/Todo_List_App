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
