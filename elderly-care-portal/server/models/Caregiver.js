const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: { type: Number, required: true },
    certifications: { type: String },
    availability: { type: String, enum: ['Full-Time', 'Part-Time', 'On-Call'], required: true },
    rating: { type: Number, default: 5 },
    reviews: [{ user_id: mongoose.Schema.Types.ObjectId, review_text: String }]
}, { timestamps: true });

module.exports = mongoose.model('Caregiver', CaregiverSchema);
