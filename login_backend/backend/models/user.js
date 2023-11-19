const mongoose = require('mongoose');
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
module.exports = mongoose.model('User',userSchema);