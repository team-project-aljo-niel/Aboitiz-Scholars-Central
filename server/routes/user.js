const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.put('/:id', userController.changeAccess);
router.get('/', userController.getAllUsers);

module.exports = router;
