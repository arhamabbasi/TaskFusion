const mongoose = require('mongoose');
const UserLog = require('./userLog');
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    role: String, 
    active: {
        type: Boolean,
        default: true,
    },
},{timestamps:true});

// Middleware for create (save) operation
userSchema.pre('save', async function (next) {
    await UserLog.create({
        userID: this._id,
        operation: 'create',
        newData: JSON.stringify(this),
        modifiedAt: new Date(),
    });
    next();
});

// Middleware for update (findOneAndUpdate) operation
userSchema.pre('findOneAndUpdate', async function (next) {
    await UserLog.create({
        userID: this.getQuery()._id,
        operation: 'update',
        oldData: JSON.stringify(this._update),
        newData: JSON.stringify(this._update),
        modifiedAt: new Date(),
    });
    next();
});

// Middleware for delete (remove) operation
userSchema.pre('remove', async function (next) {
    await UserLog.create({
        userID: this._id,
        operation: 'delete',
        oldData: JSON.stringify(this),
        modifiedAt: new Date(),
    });
    next();
});

module.exports = mongoose.model('User',userSchema);