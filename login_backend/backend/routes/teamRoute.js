const express = require('express');
const router = express.Router();
const middleware = require('../util/authMiddleware');
const teamController = require('../controller/teamController');
router.post('/createTeam',middleware.validateToken,teamController.createTeam);
router.get('/teams',middleware.validateToken,teamController.getTeam);
router.delete('/teams/:id',middleware.validateToken,teamController.deleteTeam)
router.post('/teams/:teamId/sprints/:sprintId',middleware.validateToken,teamController.assignSprintToTeam);
module.exports = router;