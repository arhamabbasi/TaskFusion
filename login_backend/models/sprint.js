const mongoose = require('mongoose');

const sprintSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true });
  
module.exports = mongoose.model('Sprint', sprintSchema);