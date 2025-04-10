// server/controllers/bookingController.js
const Booking = require("../models/Booking");

exports.saveBooking = async (session) => {
  const { userId, caregiverId, caregiverName, plan, amount } = session.metadata;

  const booking = new Booking({
    userId,
    caregiverId,
    caregiverName,
    plan,
    amount,
    stripeSessionId: session.id,
    paid: true,
  });

  await booking.save();
  console.log("✅ Booking saved to MongoDB");
};
