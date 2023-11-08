const express = require('express');
const router = express.Router();
const teamController = require('../controller/teamController');
router.post('/team',teamController.createTeam);
router.get('/team',teamController.getTeam);
module.exports = router;