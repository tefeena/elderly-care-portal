const Medication = require("../models/Medication");

//  Debug Log to Ensure Controller is Loaded
console.log(" Medication Controller Loaded!");

// Add Medication
const addMedication = async (req, res) => {
    try {
        const { medication_name, dosage, time, frequency, notes } = req.body;

        console.log("📥 Received Medication Data:", req.body);

        if (!medication_name || !dosage || !time || !frequency) {
            return res.status(400).json({ message: "All fields except notes are required." });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." });
        }

        // 🔍 **Check if medication already exists for the user**
        const existingMedication = await Medication.findOne({
            user_id: req.user.id,
            medication_name: medication_name.trim(),
            dosage: dosage.trim(),
            time: time.trim()
        });

        if (existingMedication) {
            return res.status(400).json({ message: "Medication already exists. Please update the existing record." });
        }

        // ✅ Add the new medication
        const medication = new Medication({
            user_id: req.user.id,
            medication_name: medication_name.trim(),
            dosage: dosage.trim(),
            time: time.trim(),
            frequency,
            notes: notes ? notes.trim() : "",
        });

        await medication.save();
        res.status(201).json({ message: "Medication added successfully", medication });

    } catch (error) {
        console.error("❌ Error Adding Medication:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


// Get All Medications for Logged-in User
const getMedications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." });
        }

        const medications = await Medication.find({ user_id: req.user.id });
        res.status(200).json(medications);
    } catch (error) {
        console.error("❌ Error Fetching Medications:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// Update Medication
const updateMedication = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." });
        }

        const { medication_name, dosage, time, frequency, notes } = req.body;

        // ✅ Log request payload in backend to check data received
        console.log("📤 Updating Medication Data:", req.body);

        if (!medication_name || !dosage || !time || !frequency) {
            return res.status(400).json({ message: "All fields except notes are required." });
        }

        const updatedMedication = await Medication.findOneAndUpdate(
            { _id: req.params.id, user_id: req.user.id },
            {
                medication_name: medication_name.trim(),
                dosage: dosage.trim(),
                time: time.trim(),
                frequency,
                notes: notes ? notes.trim() : "",
            },
            { new: true }
        );

        if (!updatedMedication) {
            return res.status(404).json({ message: "Medication not found or unauthorized." });
        }

        res.status(200).json({ message: "Medication updated successfully!", medication: updatedMedication });
    } catch (error) {
        console.error("❌ Error Updating Medication:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Medication
const deleteMedication = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." });
        }

        const medication = await Medication.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });

        if (!medication) {
            return res.status(404).json({ message: "Medication not found or unauthorized" });
        }

        res.status(200).json({ message: "Medication deleted successfully" });

    } catch (error) {
        console.error("❌ Error Deleting Medication:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

//  Debug: Log exported functions to check if they exist
console.log("🔍 Exporting Controllers:", { addMedication, getMedications, updateMedication, deleteMedication });

//  Ensure all functions are correctly exported
module.exports = {
    addMedication,
    getMedications,
    updateMedication,  
    deleteMedication,
};
