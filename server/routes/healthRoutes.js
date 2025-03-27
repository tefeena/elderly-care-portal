const express = require('express');
const router = express.Router();
const HealthData = require('../models/HealthData'); // Import the HealthData model

// GET: Fetch health data for a user by userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const healthData = await HealthData.findOne({ userId });

    if (!healthData) {
      return res.status(404).json({ message: "No health data found for this user." });
    }

    res.json(healthData); // Send the health data to the client
  } catch (err) {
    console.error("Error fetching health data:", err);
    res.status(500).json({ message: "Error fetching health data" });
  }
});

// POST: Create or update health data for a user by userId
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { bloodPressure, cholesterol, issue, reminder, treatmentHistory, upcomingTreatments } = req.body;

  try {
    let healthData = await HealthData.findOne({ userId });

    if (healthData) {
      // If health data exists, update it
      healthData.bloodPressure = bloodPressure;
      healthData.cholesterol = cholesterol;
      healthData.issue = issue;
      healthData.reminder = reminder;
      healthData.treatmentHistory = treatmentHistory;
      healthData.upcomingTreatments = upcomingTreatments;
      
      await healthData.save();
      return res.status(200).json({ message: "Health data updated successfully." });
    } else {
      // If no health data exists, create a new record
      healthData = new HealthData({
        userId,
        bloodPressure,
        cholesterol,
        issue,
        reminder,
        treatmentHistory,
        upcomingTreatments,
      });

      await healthData.save();
      return res.status(201).json({ message: "Health data saved successfully." });
    }
  } catch (err) {
    console.error("Error saving health data:", err);
    res.status(500).json({ message: "Error saving health data" });
  }
});

module.exports = router;
