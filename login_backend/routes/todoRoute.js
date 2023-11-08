const express = require("express");
const router = express.Router();
const todoController = require('../controller/todoController');
router.post('/todo',todoController.createTodo);
router.get('/todo',todoController.getTodos);
router.put('/todo/:id',todoController.updateTodo);
router.delete('/todo/:id',todoController.deleteTodo);
module.exports = router;