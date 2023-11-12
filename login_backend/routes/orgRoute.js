const express = require('express');
const router = express.Router();
const orgController = require('../controller/orgController');
router.post('/organizations',orgController.createOrg);
router.delete('/organizations',orgController.deleteOrg);
module.exports = router;