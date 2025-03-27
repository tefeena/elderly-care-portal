const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Basic Vitals
  blood_pressure: { type: String },
  heart_rate: { type: Number },
  cholesterol: { type: Number },
  glucose_level: { type: Number },
  temperature: { type: Number },

  // Next Appointment
  next_appointment: { type: String }, // Date or string format
  doctor_name: { type: String },
  doctor_specialty: { type: String },
  doctor_experience: { type: String },
  doctor_hospital: { type: String },

  // Treatment History
  treatment_history: {
    dental: { type: String },
    eye: { type: String },
    other: { type: String }
  },

  // Upcoming Treatments
  upcoming_treatment: {
    dental: { type: String },
    eye: { type: String },
    other: { type: String }
  }

}, { timestamps: true });

module.exports = mongoose.model('HealthData', HealthDataSchema);
