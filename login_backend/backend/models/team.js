const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    teamName: String,
    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    sprints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
      }],
    active: Boolean,
},{timestamps:true});
module.exports = mongoose.model('Team',teamSchema);