const mongoose = require('mongoose');
const SprintLog = require('./sprintLog');

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

// Middleware for create (save) operation
sprintSchema.pre('save', async function (next) {
  await SprintLog.create({
      userID: this._id,
      operation: 'create',
      newData: JSON.stringify(this),
      modifiedAt: new Date(),
  });
  next();
});

// Middleware for update (findOneAndUpdate) operation
sprintSchema.pre('findOneAndUpdate', async function (next) {
  await SprintLog.create({
      userID: this.getQuery()._id,
      operation: 'update',
      oldData: JSON.stringify(this._update),
      newData: JSON.stringify(this._update),
      modifiedAt: new Date(),
  });
  next();
});

// Middleware for delete (remove) operation
sprintSchema.pre('remove', async function (next) {
  await SprintLog.create({
      userID: this._id,
      operation: 'delete',
      oldData: JSON.stringify(this),
      modifiedAt: new Date(),
  });
  next();
});


  
module.exports = mongoose.model('Sprint', sprintSchema);