const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    teamName: String,
    teamMembers: [String],
    active: Boolean,
},{timestamps:true});
module.exports = mongoose.model('Team',teamSchema);