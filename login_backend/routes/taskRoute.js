const express = require('express');
const router = express.Router();
const controller = require('../controller/taskController');
router.post('/tasks',controller.createTask);
router.get('/tasks',controller.getTasks);
module.exports = router;