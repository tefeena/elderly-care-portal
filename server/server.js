require('dotenv').config(); // Load environment variables
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line to confirm MONGO_URI

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Use helmet for security headers
app.use(helmet());

// Enable rate-limiting for API
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after a while"
});
app.use(limiter);

// Enable CORS for the React frontend
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/elderly-care";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => {
      console.error("❌ MongoDB Connection Error:", err.message);
      process.exit(1); // Exit the process if the connection fails
  });

// Sample API Route
app.get('/', (req, res) => {
    res.send("Elderly Care Portal API Running...");
});

// Importing routes
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const caregiverRoutes = require('./routes/caregiverRoutes');
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require('./routes/healthRoutes'); // Import health routes

// Registering routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes); // Use the health routes

// Health Data Route (Post Route)
const HealthData = require('./models/healthDataModel'); // Assuming you have a model for health data

// This is where you handle saving health data
app.post('/api/healthdata/:userId', (req, res) => {
    const userId = req.params.userId;  // Extract the userId from the URL
    const healthData = req.body;       // Get the health data sent in the body of the request

    // Validate health data if needed
    if (!healthData || !userId) {
        return res.status(400).json({ message: "Missing health data or user ID" });
    }

    // Save health data to the database (you can add more validation and logic here)
    const newHealthData = new HealthData({
        userId,
        ...healthData
    });

    newHealthData.save()
        .then(savedData => {
            res.status(201).json({ message: "Health data saved successfully", data: savedData });
        })
        .catch(err => {
            console.error("Error saving health data:", err);
            res.status(500).json({ message: "Error saving health data. Please try again later." });
        });
});

// Error Handling Middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
