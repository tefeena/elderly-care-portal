const HealthData = require('../models/HealthData');
const { getHealthPrediction } = require('../services/geminiService');

// GET: Fetch user health data
exports.getHealthData = async (req, res) => {
  try {
    const healthData = await HealthData.findOne({ user_id: req.user.id });
    res.status(200).json(healthData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Submit or update health data from the HealthForm
exports.submitHealthData = async (req, res) => {
  try {
    const {
      blood_pressure,
      heart_rate,
      cholesterol,
      glucose_level,
      temperature,
      doctor_name,
      doctor_specialty,
      doctor_experience,
      doctor_hospital,
      treatment_history_dental,
      treatment_history_eye,
      treatment_history_other,
      upcoming_treatment_dental,
      upcoming_treatment_eye,
      upcoming_treatment_other
    } = req.body;

    if (
      !blood_pressure ||
      !heart_rate ||
      !cholesterol ||
      !glucose_level ||
      !temperature
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let healthRecord = await HealthData.findOne({ user_id: req.user.id });

    if (healthRecord) {
      healthRecord.blood_pressure = blood_pressure;
      healthRecord.heart_rate = heart_rate;
      healthRecord.cholesterol = cholesterol;
      healthRecord.glucose_level = glucose_level;
      healthRecord.temperature = temperature;
      healthRecord.doctor_name = doctor_name;
      healthRecord.doctor_specialty = doctor_specialty;
      healthRecord.doctor_experience = doctor_experience;
      healthRecord.doctor_hospital = doctor_hospital;
      healthRecord.treatment_history = {
        dental: treatment_history_dental,
        eye: treatment_history_eye,
        other: treatment_history_other
      };
      healthRecord.upcoming_treatment = {
        dental: upcoming_treatment_dental,
        eye: upcoming_treatment_eye,
        other: upcoming_treatment_other
      };

      await healthRecord.save();

      const prediction = await getHealthPrediction(req.body);
      return res.status(200).json({
        message: 'Health data updated successfully.',
        prediction
      });
    } else {
      healthRecord = new HealthData({
        user_id: req.user.id,
        blood_pressure,
        heart_rate,
        cholesterol,
        glucose_level,
        temperature,
        doctor_name,
        doctor_specialty,
        doctor_experience,
        doctor_hospital,
        treatment_history: {
          dental: treatment_history_dental,
          eye: treatment_history_eye,
          other: treatment_history_other
        },
        upcoming_treatment: {
          dental: upcoming_treatment_dental,
          eye: upcoming_treatment_eye,
          other: upcoming_treatment_other
        }
      });

      await healthRecord.save();

      const prediction = await getHealthPrediction(req.body);
      return res.status(201).json({
        message: 'Health data saved successfully.',
        prediction
      });
    }
  } catch (error) {
    console.error("❌ Submit Error:", error);
    res.status(500).json({ error: error.message });
  }
};
