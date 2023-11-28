const express = require('express');
const router = express.Router();
const controller = require('../controller/sprintController');
router.post('/createSprint',controller.createSprint);
router.get('/sprints',controller.getSprint);
router.get('/sprints/:id',controller.getSprintBYId);
router.delete('/sprints/:sprintId',controller.deleteSprint);
router.post('/sprints/:sprintId/tasks/:taskId',controller.addTaskToSprint);
module.exports = router;