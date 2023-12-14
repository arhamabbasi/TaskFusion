const mongoose = require('mongoose');

const taskLogSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // Reference to the User model
    // required: true,
  },
  model : {
    type: String,
    default: 'task'
  },
  operation: {
    type: String,
    enum: ['create', 'update', 'delete'],
    // required: true,
  },
  oldData: {
    type: String,
    // required: true,
  },
  newData: {
    type: String,
    // required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose model based on the schema
const TaskLog = mongoose.model('TaskLog', taskLogSchema);

module.exports = TaskLog;
