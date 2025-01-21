const express = require("express");
const { getUsers, register, login } = require("../controls/usersControls");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  type = file.mimetype.split("/")[0];
  if (type === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post("/register", upload.single("avatar"), register);

usersRouter.post("/login", login);

module.exports = usersRouter;
