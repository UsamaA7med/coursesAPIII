const asyncMiddelware = require("../middlewares/asyncMiddelware");
const userModel = require("../models/userModel");
const bcrybto = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");
const generateToken = require("../utils/generateToken");

const getUsers = asyncMiddelware(async (req, res) => {
  const Users = await userModel.find({}, { password: false });
  console.log(req.headers);
  res.json({ status: SUCCESS, data: Users });
});

const register = asyncMiddelware(async (req, res, next) => {
  const oldUser = await userModel.findOne({ email: req.body.email });
  if (oldUser) {
    const error = errorHandler("the email is exist", FAIL, 400);
    return next(error);
  }
  const hashedPassword = await bcrybto.hash(req.body.password, 10);
  const user = new userModel({ ...req.body, password: hashedPassword });
  const JWT = await generateToken(user.email, user._id, user.role);
  user.token = JWT;
  user.avatar = req.file.filename;
  await user.save();
  res.status(201).json({ status: SUCCESS, data: { user } });
});

const login = asyncMiddelware(async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    const error = errorHandler("user not found", FAIL, 404);
    return next(error);
  }
  const comparePassword = await bcrybto.compare(
    req.body.password,
    user.password
  );
  if (!comparePassword) {
    const error = errorHandler("invalid password", FAIL, 404);
    return next(error);
  }
  const token = await generateToken(user.email, user._id, user.role);
  res.json({ status: SUCCESS, data: { token } });
});

module.exports = {
  getUsers,
  register,
  login,
};
