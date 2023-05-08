const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authChecker = require('../auth/authChecker');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.get('/', authChecker, userController.getAllUsers);
router.get('/details', authChecker, userController.getCurrentUser);
router.put('/details', authChecker, userController.changeUserDetails);
router.put('/account', authChecker, userController.changeAccountDetails);
router.put('/:id', authChecker, userController.changeAccess);

module.exports = router;
