require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === "http://localhost:3000" ||
      origin === "https://elderly-care-portal.vercel.app" ||
      /\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Stripe Webhook (must come BEFORE express.json)
app.use("/api/webhook", require("./routes/stripeWebhook"));

// ✅ Body parser AFTER webhook to keep raw body for Stripe
app.use(express.json());

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/elderly-care";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚑 Elderly Care Portal API is Live!");
});

// ✅ API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/caregivers', require('./routes/caregiverRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
