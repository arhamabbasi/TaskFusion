const Task = require("../models/task");
const exception =require('./exceptionController');

//add new task 
async function createTask(req, res) {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    exception.handleException(res,error,"createTask");
    res.status(500).json({ error: error.message });
  }
}
//get all the tasks
async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    exception.handleException(res,error,"getTasks");
    res.status(500).json({ error: error.message });
  }
}
//get a task using its id
async function getTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    res.json(task);
  } catch (error) {
    exception.handleException(res,error,"getTask");
    res.status(500).json({ error: error.message });
  }
}
//update the task using its specific id
async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    exception.handleException(res,error,"updateTask");
    res.status(500).json({ error: error.message });
  }
}
//delete a specific task using its id
async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndRemove(id);
    res.status(200).json(task);
  } catch (error) {
    exception.handleException(res,error,"deleteTask");
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
