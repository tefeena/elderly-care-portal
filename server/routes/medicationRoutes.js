const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");
const authMiddleware = require("../middleware/authMiddleware");

if (!medicationController.addMedication || !medicationController.getMedications || !medicationController.deleteMedication) {
    console.error(" Error: One or more controller functions are undefined. Check medicationController.js");
}

router.post("/add", authMiddleware, medicationController.addMedication);
router.get("/all", authMiddleware, medicationController.getMedications);
router.delete("/delete/:id", authMiddleware, medicationController.deleteMedication);
router.put("/update/:id", authMiddleware, medicationController.updateMedication);

module.exports = router;
