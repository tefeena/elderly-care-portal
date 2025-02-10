const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    medication_name: { type: String, required: true },
    dosage: { type: String, required: true },
    time: { type: String, required: true },
    frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
    notes: { type: String },
    notification_method: { type: String, enum: ['Email', 'SMS', 'App', 'Smartwatch'], default: 'App' }
}, { timestamps: true });

module.exports = mongoose.model('Medication', MedicationSchema);
