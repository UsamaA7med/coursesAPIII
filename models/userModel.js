const mongoose = require("mongoose");
const validator = require("validator");

const userModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "MANAGER"],
    default: "USER",
  },
  avatar: {
    type: String,
    default: "uploads/img.png",
  },
});

module.exports = mongoose.model("User", userModel);
