const HealthData = require('../models/HealthData');

exports.getHealthData = async (req, res) => {
    try {
        // Fetch the health data for the logged-in user using req.user._id
        const healthData = await HealthData.findOne({ user_id: req.user._id });

        // If no health data is found, return a 404 response
        if (!healthData) {
            return res.status(404).json({ message: 'Health data not found for this user.' });
        }

        // Return the health data as JSON
        res.status(200).json(healthData);
    } catch (error) {
        // Catch any errors and return a 500 response with the error message
        res.status(500).json({ error: error.message });
    }
};
