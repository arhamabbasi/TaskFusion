const express = require('express');
const router = express.Router();
const teamController = require('../controller/teamController');
router.post('/createTeam',teamController.createTeam);
router.get('/teams',teamController.getTeam);
router.delete('/teams/:id',teamController.deleteTeam)
router.post('/teams/:teamId/sprints/:sprintId',teamController.assignSprintToTeam);
module.exports = router;