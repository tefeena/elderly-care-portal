const express = require('express');
const { addMedication, getMedications, deleteMedication } = require('../controllers/medicationController'); 
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addMedication);  
router.get('/all', authMiddleware, getMedications);  
router.delete('/delete/:id', authMiddleware, deleteMedication);  

module.exports = router;
