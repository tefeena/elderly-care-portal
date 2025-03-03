const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema(
  {
    user_id: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medication_name: {
      type: String,
      required: [true, "Medication name is required"],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      required: [true, "Frequency is required"],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", MedicationSchema);
