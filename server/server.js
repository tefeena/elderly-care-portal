require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(" MongoDB Connected Successfully!"))
.catch(err => console.error(" MongoDB Connection Error:", err));


// Sample API Route
app.get('/', (req, res) => {
    res.send("Elderly Care Portal API Running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const medicationRoutes = require('./routes/medicationRoutes');
app.use('/api/medications', medicationRoutes);
