const express = require('express');
const scholarController = require('../controller/scholarController');
const router = express.Router();

router.get('/', scholarController.getAllScholars);
router.put('/info', scholarController.updateScholarInfo);

module.exports = router;
