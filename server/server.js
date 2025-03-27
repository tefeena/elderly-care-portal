require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/elderly-care";

mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully!"))
  .catch(err => {
      console.error("❌ MongoDB Connection Error:", err.message);
      process.exit(1); 
  });

//  Sample API Route
app.get('/', (req, res) => {
    res.send("Elderly Care Portal API Running...");
});

//  Import routes
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const caregiverRoutes = require('./routes/caregiverRoutes');
const userRoutes = require("./routes/userRoutes"); 
const healthRoutes = require('./routes/healthRoutes'); 

//  Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes); 

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
