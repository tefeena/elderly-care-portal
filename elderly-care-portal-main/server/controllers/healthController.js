const HealthData = require('../models/HealthData');

exports.getHealthData = async (req, res) => {
    try {
        const healthData = await HealthData.findOne({ user_id: req.user.id });
        res.status(200).json(healthData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
