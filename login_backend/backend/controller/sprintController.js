const Sprint = require("../models/sprint");
const Task = require("../models/task");
const exception =require('./exceptionController');

//create a new Sprint
async function createSprint(req, res) {
  try {
    const newSprint = await Sprint.create(req.body);
    res.status(201).json(newSprint);
  } catch (error) {
    exception.handleException(res,error,"createSprint");
    res.status(500).json({ error: error.message });
  }
}
// get the list of all sprints
async function getSprint(req, res) {
  try {
    const sprints = await Sprint.find().populate({
      path: "tasks",
      select: "description status",
    });
    res.status(201).json(sprints);
  } catch (error) {
    exception.handleException(res,error,"getSprint");
    res.status(500).json({ error: error.message });
  }
}

//get specific sprint by using specific id 
async function getSprintBYId(req, res) {
  try {
    const id = req.params.id;
    const sprint = await Sprint.findById(id).populate({
      path: "tasks",
      select: "description status",
    });

    res.status(201).json(sprint);
  } catch (error) {
    exception.handleException(res,error,"getSprintById");
    res.status(500).json({ error: error.message });
  }
}
//delete the existing sprint by using its id
async function deleteSprint(req, res) {
  try {
    const { sprintId } = req.params;
    if (!sprintId) {
      return res.status(400).json({ message: "Invalid sprintId" });
    }
    const deletedSprint = await Sprint.findByIdAndDelete(sprintId);

    if (!deletedSprint) {
      return res.status(404).json({ message: "Sprint not found" });
    }
    res.json({ message: "Sprint deleted successfully" });
  } catch (error) {
    exception.handleException(res,error,"deleteSprint");
    res.status(500).json({ error: error.message });
  }
}
//add speific task to specific sprint by using the id of task and sprint
async function addTaskToSprint(req, res) {
  try {
    const { sprintId, taskId } = req.params;

    const sprint = await Sprint.findById(sprintId);
    const task = await Task.findById(taskId);

    if (!sprint || !task) {
      return res.status(404).json({ message: "Sprint or Task not found" });
    }
    const isDuplicate = sprint.tasks.includes(task._id);

    if (isDuplicate) {
      return res.status(400).json({ message: "Task is already in the Sprint" });
    }
    sprint.tasks.push(task._id);
    await sprint.save();

    res.json({ message: "Task added to Sprint successfully" });
  } catch (error) {
    exception.handleException(res,error,"addTaskToSprint");
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteSprint,
  addTaskToSprint,
  getSprint,
  createSprint,
  getSprintBYId,
};
