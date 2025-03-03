const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blood_pressure: { type: String },
    heart_rate: { type: Number },
    glucose_level: { type: Number },
    temperature: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('HealthData', HealthDataSchema);
