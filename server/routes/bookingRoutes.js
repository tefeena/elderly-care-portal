const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Get all bookings for logged-in user
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate("caregiverId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
