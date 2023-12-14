const mongoose = require('mongoose');

const exceptionLogSchema = mongoose.Schema({
  functionName: String,
  message: {
    type: String,
    required: true,
  },
  stackTrace: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExceptionLog = mongoose.model('ExceptionLog', exceptionLogSchema);

module.exports = ExceptionLog;
