const express = require('express');
const router = express.Router();
const controller = require('../controller/sprintController');
router.post('/sprints',controller.createSprint);
router.get('/sprints',controller.getSprint);
router.delete('/sprints/:sprintId',controller.deleteSprint);
router.post('/sprints/:sprintId/tasks/:taskId',controller.addTaskToSprint);
module.exports = router;