require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allow both local and Vercel frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://elderly-care-portal-jqfvrczyb-tefeenas-projects.vercel.app", // ✅ your actual Vercel frontend domain
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Stripe Webhook (comes before express.json)
app.use("/api/webhook", require("./routes/stripeWebhook"));

// ✅ Body Parser
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/elderly-care";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚑 Elderly Care Portal API is Live!");
});

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/caregivers', require('./routes/caregiverRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
