const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Caregiver", required: true },
  caregiverName: { type: String, required: true },
  plan: { type: String, enum: ["Daily", "Weekly", "Monthly"], required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
