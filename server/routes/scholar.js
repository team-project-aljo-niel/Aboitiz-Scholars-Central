const express = require('express');
const scholarController = require('../controller/scholarController');
const router = express.Router();
const authChecker = require('../auth/authChecker');


router.get('/', authChecker, scholarController.getAllScholars);
router.post('/details', authChecker, scholarController.createScholarDetails);
router.put('/details', authChecker, scholarController.updateCurrentScholar);
router.put('/details/:id',authChecker, scholarController.updateScholarDetails);

module.exports = router;
