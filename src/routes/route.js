const express = require('express');

const router = express.Router();

const {internController} = require('../controllers');


// intern routes
router.post('/colleges', internController.registerCollege);
router.post('/interns', internController.registerIntern);
router.get('/collegeDetails', internController.collegeDetails);


module.exports = router;