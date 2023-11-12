const mongoose = require('mongoose');
const organizationSchema = mongoose.Schema({
    name : {
      type: String,
      required: true,
    },
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    }],
    active: {
        type: Boolean,
        default: true,
    },
},{timestamps:true});
module.exports = mongoose.model('Org',organizationSchema);
