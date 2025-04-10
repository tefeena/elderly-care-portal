require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allow frontend access
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ Mount webhook route BEFORE express.json()
const stripeWebhook = require("./routes/stripeWebhook");
app.use("/api/webhook", stripeWebhook);

// ✅ Parse JSON for all other routes
app.use(express.json());

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/elderly-care";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Health check route
app.get('/', (req, res) => {
  res.send("🚑 Elderly Care Portal API Running...");
});

// ✅ Import and mount all routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/caregivers', require('./routes/caregiverRoutes'));
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/payments', require("./routes/paymentRoutes"));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
