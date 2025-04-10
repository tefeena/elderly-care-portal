const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Booking = require("../models/Booking");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Webhook route
router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("🎯 Received checkout.session.completed event");
    console.log("📦 Session metadata:", session.metadata);

    const { userId, caregiverId, caregiverName, plan, amount } = session.metadata;

    // Log the types for debug
    console.log("🧪 Metadata Types:", {
      userIdValue: userId,
      userIdType: typeof userId,
      caregiverIdValue: caregiverId,
      caregiverIdType: typeof caregiverId,
      plan,
      amount
    });

    // If userId is empty, stop here
    if (!userId || !caregiverId) {
      console.error("❌ Booking not saved: Missing userId or caregiverId in session metadata");
      return res.sendStatus(400);
    }

    try {
      console.log("📥 Attempting to save booking to MongoDB...");

      const newBooking = await Booking.create({
        userId: new ObjectId(userId),
        caregiverId: new ObjectId(caregiverId),
        caregiverName,
        plan,
        amount,
        stripeSessionId: session.id,
        paid: true,
      });

      console.log("✅ Booking saved to MongoDB:", newBooking);
    } catch (err) {
      console.error("❌ Error saving booking:", err.message);
      console.error("📛 Full error details:", err);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
