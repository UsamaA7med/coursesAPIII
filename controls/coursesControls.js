const courseModel = require("../models/courseModel");
const { SUCCESS, FAIL } = require("../utils/httpStatusText");
const asyncMiddelware = require("../middlewares/asyncMiddelware");
const errorHandler = require("../utils/errorHandler");
const getAllCourses = async (req, res) => {
  const query = req.query;
  const courses = await courseModel
    .find()
    .limit(query.limit)
    .skip((query.page - 1) * query.limit);
  res.json({ status: SUCCESS, data: { courses } });
};

const getSingleCourse = asyncMiddelware(async (req, res, next) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    const error = errorHandler("Course not found", FAIL, 404);
    return next(error);
  }
  res.json({ status: "success", data: { course } });
});

const addCourse = asyncMiddelware(async (req, res) => {
  const newCourse = new courseModel(req.body);
  await newCourse.save();
  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncMiddelware(async (req, res) => {
  const updatedCourse = await courseModel.updateOne(
    { _id: req.params.id },
    {
      $set: { ...req.body },
    }
  );
  res.json({ status: SUCCESS, data: { course: updatedCourse } });
});

const deleteCourse = asyncMiddelware(async (req, res) => {
  await courseModel.deleteOne({ _id: req.params.id });
  res.json({ status: SUCCESS, data: null });
});

module.exports = {
  deleteCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  addCourse,
};
