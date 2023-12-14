const mongoose = require('mongoose');
const TaskLog = require('./taskLog');

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
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

// Middleware for create (save) operation
taskSchema.pre('save', async function (next) {
  await TaskLog.create({
      userID: this._id,
      operation: 'create',
      newData: JSON.stringify(this),
      modifiedAt: new Date(),
  });
  next();
});

// Middleware for update (findOneAndUpdate) operation
taskSchema.pre('findOneAndUpdate', async function (next) {
  await TaskLog.create({
      userID: this.getQuery()._id,
      operation: 'update',
      oldData: JSON.stringify(this._update),
      newData: JSON.stringify(this._update),
      modifiedAt: new Date(),
  });
  next();
});

// Middleware for delete (remove) operation
taskSchema.pre('remove', async function (next) {
  await TaskLog.create({
      userID: this._id,
      operation: 'delete',
      oldData: JSON.stringify(this),
      modifiedAt: new Date(),
  });
  next();
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
