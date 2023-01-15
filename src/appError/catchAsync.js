// To Prevent Doing Bunch Of try {} catch(){} blocks in every function (controllers)
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
