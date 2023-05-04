const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.put('/:id', userController.changeAccess);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getCurrentUser);

module.exports = router;
