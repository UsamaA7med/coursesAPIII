const express = require("express");

const coursesRouter = express.Router();

const {
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  addCourse,
} = require("../controls/coursesControls");
const verifyToken = require("../middlewares/verifyToken");
const allowToDoSomething = require("../middlewares/allowToDoSomething");

coursesRouter
  .route("/")
  .get(verifyToken, getAllCourses)
  .post(verifyToken, addCourse);

coursesRouter
  .route("/:id")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(verifyToken, allowToDoSomething("ADMIN", "MANAGER"), deleteCourse);

module.exports = coursesRouter;
