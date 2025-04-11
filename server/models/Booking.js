const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Caregiver", required: true },
  caregiverName: { type: String, required: true },
  plan: { type: String, enum: ["Daily", "Weekly", "Monthly"], required: true },
  amount: { type: Number, required: true },
  stripeSessionId: { type: String },
  paid: { type: Boolean, default: false },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
