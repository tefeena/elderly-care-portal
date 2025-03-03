const express = require('express');
const { getCaregivers } = require('../controllers/caregiverController');
const router = express.Router();

router.get('/all', getCaregivers);

module.exports = router;
