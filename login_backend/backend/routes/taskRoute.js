const express = require('express');
const router = express.Router();
const controller = require('../controller/taskController');
router.post('/createTask',controller.createTask);
router.get('/tasks',controller.getTasks);
router.get('/tasks/:id',controller.getTask);
router.put('/tasks/:id',controller.updateTask);
router.delete('/tasks/:id',controller.deleteTask);


module.exports = router;