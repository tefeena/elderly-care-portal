const express = require('express');
const router = express.Router();
const { getHealthData, submitHealthData } = require('../controllers/healthController');
const authMiddleware = require('../middleware/authMiddleware');

// GET user health data
router.get('/data', authMiddleware, getHealthData);

// ✅ ADD this POST route for health form submission
router.post('/submit', authMiddleware, submitHealthData);

module.exports = router;
