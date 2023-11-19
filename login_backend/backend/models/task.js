const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['complete', 'pending'],
    required: true,
  },
//   sprintId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Sprint', 
//     nullable: true,
//   },
//   assignedUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', 
//   },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
