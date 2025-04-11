const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., Daily, Weekly, Monthly
  label: { type: String, required: true },              // e.g., For One Day
  price: { type: Number, required: true },
  features: [String],
});

module.exports = mongoose.model("Plan", PlanSchema);
