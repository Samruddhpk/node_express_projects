const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

const createTask = asyncWrapper(async (req, res) => {
  //   res.send("Create Task");
  const task = await Task.create(req.body);
  res.status(201).json({ task, msg: "Task Added" });
});

const getAllTasks = asyncWrapper(async (req, res) => {
  //   res.send("Get all tasks");
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
  //   res.send("Get single task");
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  //   res.send("delete task");
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }

  return res.status(200).json({ task, msg: "Task deleted" });
});

const updateTask = asyncWrapper(async (req, res) => {
  //   res.send("Update task");
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  return res.status(200).json({ task, msg: "Task Updated" });
});

module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
};
