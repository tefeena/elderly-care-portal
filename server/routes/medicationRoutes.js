const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Ensure controllers exist
if (!medicationController.addMedication || !medicationController.getMedications || !medicationController.deleteMedication) {
    console.error("❌ Error: One or more controller functions are undefined. Check medicationController.js");
}

// ✅ Use Correct References for Controller Functions
router.post("/add", authMiddleware, medicationController.addMedication);
router.get("/all", authMiddleware, medicationController.getMedications);
router.delete("/delete/:id", authMiddleware, medicationController.deleteMedication);

module.exports = router;
