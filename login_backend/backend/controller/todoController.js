const Todo = require("../models/todo");

async function createTodo(req, res) {
  const { task } = req.body;
  try {
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {new: true,});
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndRemove(id);
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createTodo, deleteTodo,updateTodo,getTodos };
