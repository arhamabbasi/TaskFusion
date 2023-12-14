const mongoose = require('mongoose');

const sprintLogSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint', // Reference to the User model
    // required: true,
  },
  model : {
    type: String,
    default: 'sprint'
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
const SprintLog = mongoose.model('SprintLog', sprintLogSchema);

module.exports = SprintLog;
