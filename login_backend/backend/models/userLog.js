const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    // required: true,
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
const UserLog = mongoose.model('UserLog', userLogSchema);

module.exports = UserLog;
