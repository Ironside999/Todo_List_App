const AppError = require('../appError/appError');

module.exports = (err, req, res, next) => {
  let error = err.isOperational ? err : { ...err };
  console.log(err);

  if (err.code === 'ER_BAD_FIELD_ERROR' || err.name === 'ER_BAD_FIELD_ERROR') {
    error = new AppError('Bad Request In Inputs', 400);
  }

  if (err.name === 'SyntaxError') {
    error = new AppError('BAD REQUEST', 400);
  }
  if (err.name === 'SequelizeDatabaseError') {
    error = new AppError(err.parent.sqlMessage || 'BAD REQUEST', 400);
  }

  if (error.name === 'SequelizeValidationError') {
    const msg = error?.errors?.[0]?.message || 'Validation Failed';
    error = new AppError(msg, 400);
  }
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    const msg = error?.fields?.[0] || 'FOREIGN KEY';
    error = new AppError(msg + ' Not Valid', 400);
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    error = new AppError(err?.parent?.sqlMessage || 'SHOULD BE UNIQUE', 400);
  }

  if (error.errorno === 'ETIMEDOUT' || err.errorno === 'ETIMEDOUT') {
    error = new AppError(`error sequelize tome out connection${error}`);
  }
  if (error.isOperational) {
    res.status(error.statusCode).send({
      status: error.status,
      message: error.message,
    });
  } else {
    //production
    // res.status(500).send({
    //   status: "error",
    //   message: "Unknown Error",
    // });
    // development
    res.status(500).send(err);
  }
};
