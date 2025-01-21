const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const { FAIL } = require("../utils/httpStatusText");
module.exports = (req, res, next) => {
  const Authorization =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!Authorization) {
    const error = errorHandler("token not provided", FAIL, 401);
    return next(error);
  }
  const token = Authorization.split(" ")[1];
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.verifyToken = verifyToken;
  if (!verifyToken) {
    const error = errorHandler("invalid token", FAIL, 401);
    return next(error);
  }
  next();
};
