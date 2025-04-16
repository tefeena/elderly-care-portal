const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Secure Stripe initialization

// ✅ POST /api/stripe/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  const { caregiverId, caregiverName, userId, plan, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Caregiver: ${caregiverName}`,
              description: `${plan} Plan Booking`,
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      success_url: "https://elderly-care-portal.vercel.app/health-dashboard",
      cancel_url: "https://elderly-care-portal.vercel.app/caregivers",

      metadata: {
        userId,
        caregiverId,
        caregiverName,
        plan,
        amount,
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe session error:", error.message);
    res.status(500).json({ error: "Payment session creation failed" });
  }
});

module.exports = router;
