const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
router.post("/createProject", projectController.createProject);
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
router.delete("/projects/:id", projectController.deleteProject);
module.exports = router;
