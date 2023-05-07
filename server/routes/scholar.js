const express = require('express');
const scholarController = require('../controller/scholarController');
const router = express.Router();

router.get('/', scholarController.getAllScholars);
router.post('/details', scholarController.createScholarDetails);
router.put('/details', scholarController.updateScholarDetails);

module.exports = router;
