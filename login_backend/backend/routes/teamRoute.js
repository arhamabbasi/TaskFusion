const express = require('express');
const router = express.Router();
const teamController = require('../controller/teamController');
router.post('/teams',teamController.createTeam);
router.get('/teams',teamController.getTeam);
router.post('/teams/:teamId/sprints/:sprintId',teamController.assignSprintToTeam);
module.exports = router;