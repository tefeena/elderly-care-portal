const mongoose = require('mongoose');

// Define the health data schema
const healthDataSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // The ID of the user
    blood_pressure: { type: String, required: true },
    heart_rate: { type: String, required: true },
    glucose_level: { type: String, required: true },
    temperature: { type: String, required: true },
    issue: { type: String, required: true },
    reminder: { type: String, required: true },

    // Treatment history is an array of objects, each containing treatment info
    treatmentHistory: [
      {
        treatment: { type: String, required: true }, // Description of treatment
        doctor: { type: String, required: true }, // Name of the doctor
        date: { type: Date, default: Date.now }, // Date when treatment occurred
      }
    ],

    // Upcoming treatments is also an array of objects
    upcomingTreatments: [
      {
        treatment: { type: String, required: true }, // Treatment description
        doctor: { type: String, required: true }, // Name of the doctor
        date: { type: Date, required: true }, // Date when treatment is scheduled
      }
    ]
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Explicitly specify collection name as 'healthdatas'
const HealthData = mongoose.model('HealthData', healthDataSchema, 'healthdatas');

module.exports = HealthData;
