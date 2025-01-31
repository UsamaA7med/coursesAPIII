const express = require("express");

const cors = require("cors");

const coursesRouter = require("./router/coursesRouter");

const path = require("path");

require("dotenv").config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoose = require("mongoose");
const { ERROR, SUCCESS } = require("./utils/httpStatusText");
const usersRouter = require("./router/usersRouter");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => console.log("mongodb server start"));

app.use(express.json());

app.use(cors());

app.use("/api/courses", coursesRouter);

app.use("/api/users", usersRouter);

app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: ERROR, message: "this resurse not avilable" });
});

app.get("/", (req, res) => {
  return res.json({ status: SUCCESS, message: "success access" });
});

app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({ status: error.status || SUCCESS, message: error.message });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
