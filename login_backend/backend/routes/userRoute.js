const express = require('express');
const router = express.Router();
const middleware = require('../util/authMiddleware');
const userController = require('../controller/userController');
router.post('/register',middleware.requireRoles(['admin','user']),userController.createUser);
router.post('/login',userController.loginUser);
router.get('/users',middleware.validateToken,userController.getAllUsers);
router.get('/users/:id',userController.getUser);
router.get("/dashboard",middleware.validateToken,userController.dashboard);
router.put('/users/:id',userController.updateUser);
router.delete('/users/:id',userController.deleteUser);
module.exports = router;