const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);
router.get('/details', userController.getCurrentUser);
router.put('/details', userController.changeUserDetails);
router.put('/change-password', userController.changeUserPassword);
router.put('/:id', userController.changeAccess);

module.exports = router;
