const Todo = require("../models/todo");
//create a new todo list 
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
//get a list of all the todos
async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//update the todo by using its id
async function updateTodo(req, res) {
  const { id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {new: true,});
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//delete the specific todo by using its id
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
