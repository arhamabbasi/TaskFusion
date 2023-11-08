const Team = require("../models/team");
const User = require("../models/user");

async function createTeam(req, res) {
  const { teamName, teamMember } = req.body;
  const teamMemberArray = teamMember.split(" ");
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
        res.send({ message: "email didn't match" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getTeam(req, res) {
  const { teamName } = req.body;

  try {
    const team = await Team.findOne({ teamName });
    if (team) {
      res.status(200).json({ team });
    } else {
      res.status(404).json({ message: `Team '${teamName}' not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTeam,
  getTeam,
};
