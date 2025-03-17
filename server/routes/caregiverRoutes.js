const express = require("express");
const router = express.Router();
const caregiverController = require("../controllers/caregiverController");
const Caregiver = require("../models/Caregiver"); // ✅ Import the model

// Get only approved caregivers (for normal users)
router.get("/", caregiverController.getCaregivers);

// Get all caregivers (for admin)
router.get("/all", caregiverController.getAllCaregivers);

// Approve/Decline caregiver (for admin)
router.put("/approve/:id", caregiverController.approveCaregiver);

// Register a Caregiver
router.post("/register", caregiverController.registerCaregiver);

// ✅ Remove duplicate `/add` and use `/register` instead
// OR Keep this route and remove `/register`
router.post("/add", async (req, res) => {
    console.log("🟢 Received Caregiver Data:", req.body); // Debugging Log

    try {
        const caregiver = new Caregiver(req.body);
        await caregiver.save();
        console.log("✅ Caregiver Added Successfully!");
        res.status(201).json({ message: "Caregiver added successfully", caregiver });
    } catch (error) {
        console.error("❌ Error Adding Caregiver:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
