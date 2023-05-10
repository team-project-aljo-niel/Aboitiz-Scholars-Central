const express = require('express');
const authChecker = require('../auth/authChecker');
const gradesController = require('../controller/gradesController');
const router = express.Router();

router.get('/', authChecker, gradesController.getAllGrades);
router.post('/:id', authChecker, gradesController.createScholarGrades);
router.put('/:id', authChecker, gradesController.editScholarGrades);

module.exports = router;
