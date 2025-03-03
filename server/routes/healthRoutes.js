const express = require('express');
const { getHealthData } = require('../controllers/healthController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/data', authMiddleware, getHealthData);

module.exports = router;
