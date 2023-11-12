const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    teamName: String,
    teamMembers: [String],
    sprints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
      }],
    active: Boolean,
},{timestamps:true});
module.exports = mongoose.model('Team',teamSchema);