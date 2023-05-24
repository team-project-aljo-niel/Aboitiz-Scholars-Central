const express = require('express');
const router = express.Router();
const authChecker = require('../auth/authChecker');
const accountUpdatesController = require('../controller/updatesController');

router.get('/', authChecker, accountUpdatesController.getAllUpdates);
router.post('/', authChecker, accountUpdatesController.createAccountUpdates);
router.delete(
  '/:id',
  authChecker,
  accountUpdatesController.deteleAccountUpdates
);

module.exports = router;
