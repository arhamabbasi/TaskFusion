const Project = require("../models/project");
const exception =require('./exceptionController');
// create a new project by getting name, description, startDate, endDate
async function createProject(req, res) {
  try {
    const { name, description, startDate, endDate } = req.body;
    const project = new Project({ name, description, startDate, endDate });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    exception.handleException(res,error,"createProject");
    res.status(500).json({ error: error.message });
  }
}
//get the list of all projects 
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    exception.handleException(res,error,"getAllProjects");
    res.status(500).json({ error: error.message });
  }
}
//get specific project by id
async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    exception.handleException(res,error,"getProjectById");
    res.status(500).json({ error: error.message });
  }
}
//delete the existing project by using its id
async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    exception.handleException(res,error,"deleteProject");
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
};
