const Team = require('../models/team');
const User = require('../models/user');
const Sprint = require('../models/sprint');

async function createTeam(req, res) {
  const { teamName, teamMembers } = req.body;
  const teamMemberArray = teamMembers.split(" ");
  try {
    for (const element of teamMemberArray) {
      const user = await User.findOne({ email: element });
      const teamExist = await Team.findOne({ teamName: teamName });
      if (user) {
        if (teamExist) {
          teamExist.teamMembers.push(user._id);
          await teamExist.save();
          res
            .status(201)
            .json({ message: `Members successfully added in ${teamName}` });
        } else {
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
    res.status(500).json({ error: error });
  }
}

async function getTeam(req, res) {
  // const { teamName } = req.body;

  try {
    // const team = await Team.findOne({ teamName });
    const team = await Team.find().populate({
      path: "sprints",
    });
    if (team) {
      res.status(200).json({ team });
    } else {
      res.status(404).json({ message: `Team '${teamName}' not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTeam,
  getTeam,
  assignSprintToTeam,
};