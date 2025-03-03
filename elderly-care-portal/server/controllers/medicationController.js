const Medication = require('../models/Medication');

exports.addMedication = async (req, res) => {
    try {
        const medication = new Medication({ ...req.body, user_id: req.user.id });
        await medication.save();
        res.status(201).json({ message: "Medication added successfully", medication });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMedications = async (req, res) => {
    try {
        const medications = await Medication.find({ user_id: req.user.id });
        res.status(200).json(medications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMedication = async (req, res) => {
    try {
        await Medication.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Medication deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
