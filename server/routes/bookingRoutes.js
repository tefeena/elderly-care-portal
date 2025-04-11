const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ Get all bookings for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate("caregiverId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all bookings (Admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId caregiverId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a booking
router.delete("/:bookingId", async (req, res) => {
  try {
    const result = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!result) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a booking (Admin update only plan or amount)
router.put("/:bookingId", async (req, res) => {
  try {
    const { plan, amount } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { plan, amount },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
