const errorHandler = require("../utils/errorHandler");
const { FAIL } = require("../utils/httpStatusText");
module.exports = (...payload) => {
  return (req, res, next) => {
    if (!payload.includes(req.verifyToken.role)) {
      const error = errorHandler("vailoate roles", FAIL, 400);
      next(error);
    }
    next();
  };
};
