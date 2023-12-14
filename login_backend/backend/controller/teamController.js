const Team = require('../models/team');
const User = require('../models/user');
const Sprint = require('../models/sprint');
const exception =require('./exceptionController');

//cretae Team using teamName and teamMembers' emails
async function createTeam(req, res) {
  const { teamName, teamMembers } = req.body;
  try {
    for (const element of teamMembers) {
      const user = await User.findOne({ email: element });
      const teamExist = await Team.findOne({ teamName: teamName });
      if (user) {
        if (teamExist && !teamExist.teamMembers.includes(user._id)) {
          teamExist.teamMembers.push(user._id);
          await teamExist.save();
          res
            .status(201)
            .json({ message: `Members successfully added in ${teamName}` });
        }
        else if(teamExist && teamExist.teamMembers.includes(user._id)){
          res
            .status(201)
            .json({ message: `Members already added in ${teamName}` });
        }
         else{
          const team = new Team({ teamName, active: true });
          team.teamMembers.push(user._id);
          await team.save();
          res
            .status(201)
            .json({ message: `Members successfully added in ${teamName}` });
        }
      } else {
        res.send({ message: "wrong email" });
      }
    }
  } catch (error) {
    exception.handleException(res,error,"createTeam");
    res.status(500).json({ error: error });
  }
}
// get the list of all teams
async function getTeam(req, res) {
  // const { teamName } = req.body;

  try {
    // const team = await Team.findOne({ teamName });
    const team = await Team.find().populate([
      {
        path: "teamMembers",
        select: "name email",
      },
      {
        path: "sprints",
        select: "name",
      }
    ]);
      res.status(200).json({ team });
  } catch (error) {
    exception.handleException(res,error,"getTeam");
    res.status(500).json({ error: error.message });
  }
}
//delete team using specific id
async function deleteTeam(req,res){
  try {
    const id  = req.params.id;
    const deleteTeam = await Team.findByIdAndRemove(id);
    res.status(200).json(deleteTeam);
  } catch (err) {
    exception.handleException(res,err,"deleteTeam");
    res.status(500).json({ error: err.message });
  }
}
//assign specific sprint to specific Team using their ids
async function assignSprintToTeam(req, res){
  try {
    const { teamId, sprintId } = req.params;

    if (!sprintId || !teamId) {
      return res.status(400).json({ message: 'Invalid sprint ID or team ID' });
    }
    const sprint = await Sprint.findById(sprintId);
    const team = await Team.findById(teamId);
    if (!sprint || !team) {
      return res.status(404).json({ message: 'Sprint or team not found' });
    }
    team.sprints.push(sprint._id);
    await team.save();
    res.json({ message: 'Sprint assigned to team successfully', team });
  } catch (error) {
    exception.handleException(res,error,"assignSprintToTeam");
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTeam,
  getTeam,
  assignSprintToTeam,
  deleteTeam,
};
