const Caregiver = require('../models/Caregiver');

exports.getCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find();
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
