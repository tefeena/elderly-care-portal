import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import './HealthForm.css';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    blood_pressure: '',        
    heart_rate: '',
    cholesterol: '',
    glucose_level: '',
    temperature: '',
    doctor_name: '',
    doctor_specialty: '',
    doctor_experience: '',
    doctor_hospital: '',
    treatment_history_dental: '',
    treatment_history_eye: '',
    treatment_history_other: '',
    upcoming_treatment_dental: '',
    upcoming_treatment_eye: '',
    upcoming_treatment_other: ''
  });

  const navigate = useNavigate();

  // Fetch existing health data and prefill the form
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/health/data', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data) {
        setFormData({
          blood_pressure: res.data.blood_pressure || '',
          heart_rate: res.data.heart_rate || '',
          cholesterol: res.data.cholesterol || '',
          glucose_level: res.data.glucose_level || '',
          temperature: res.data.temperature || '',
          doctor_name: res.data.doctor_name || '',
          doctor_specialty: res.data.doctor_specialty || '',
          doctor_experience: res.data.doctor_experience || '',
          doctor_hospital: res.data.doctor_hospital || '',
          treatment_history_dental: (res.data.treatment_history && res.data.treatment_history.dental) || '',
          treatment_history_eye: (res.data.treatment_history && res.data.treatment_history.eye) || '',
          treatment_history_other: (res.data.treatment_history && res.data.treatment_history.other) || '',
          upcoming_treatment_dental: (res.data.upcoming_treatment && res.data.upcoming_treatment.dental) || '',
          upcoming_treatment_eye: (res.data.upcoming_treatment && res.data.upcoming_treatment.eye) || '',
          upcoming_treatment_other: (res.data.upcoming_treatment && res.data.upcoming_treatment.other) || ''
        });
      }
    })
    .catch(err => console.error('Error fetching health data:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/health/submit', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Health data saved!");
      navigate('/health-dashboard');
    } catch (err) {
      alert('Failed to submit health data.');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h1>Health Information</h1>
      <h2>Tell us about your current condition</h2>

      {/* NEW FIELD for Blood Pressure */}
      <input
        type="text"
        name="blood_pressure"
        placeholder="Blood Pressure (e.g., 120/80)"
        value={formData.blood_pressure}
        onChange={handleChange}
      />

      <input
        type="number"
        name="heart_rate"
        placeholder="Heart Rate (BPM)"
        value={formData.heart_rate}
        onChange={handleChange}
      />
      <input
        type="number"
        name="cholesterol"
        placeholder="Cholesterol (mg/dL)"
        value={formData.cholesterol}
        onChange={handleChange}
      />
      <input
        type="number"
        name="glucose_level"
        placeholder="Glucose Level (mg/dL)"
        value={formData.glucose_level}
        onChange={handleChange}
      />
      <input
        type="number"
        name="temperature"
        placeholder="Body Temperature (°C)"
        value={formData.temperature}
        onChange={handleChange}
      />

      <h3>Next Doctor Appointment</h3>
      <input
        type="text"
        name="doctor_name"
        placeholder="Doctor Name"
        value={formData.doctor_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="doctor_specialty"
        placeholder="Specialty"
        value={formData.doctor_specialty}
        onChange={handleChange}
      />
      <input
        type="text"
        name="doctor_experience"
        placeholder="Experience (e.g., 10+ years)"
        value={formData.doctor_experience}
        onChange={handleChange}
      />
      <input
        type="text"
        name="doctor_hospital"
        placeholder="Hospital Name"
        value={formData.doctor_hospital}
        onChange={handleChange}
      />

      <h3>Treatment History</h3>
      <input
        type="text"
        name="treatment_history_dental"
        placeholder="Dental Treatment History"
        value={formData.treatment_history_dental}
        onChange={handleChange}
      />
      <input
        type="text"
        name="treatment_history_eye"
        placeholder="Eye Treatment History"
        value={formData.treatment_history_eye}
        onChange={handleChange}
      />
      <input
        type="text"
        name="treatment_history_other"
        placeholder="Other Treatment History"
        value={formData.treatment_history_other}
        onChange={handleChange}
      />

      <h3>Upcoming Treatments</h3>
      <input
        type="text"
        name="upcoming_treatment_dental"
        placeholder="Upcoming Dental Treatment"
        value={formData.upcoming_treatment_dental}
        onChange={handleChange}
      />
      <input
        type="text"
        name="upcoming_treatment_eye"
        placeholder="Upcoming Eye Treatment"
        value={formData.upcoming_treatment_eye}
        onChange={handleChange}
      />
      <input
        type="text"
        name="upcoming_treatment_other"
        placeholder="Upcoming Other Treatment"
        value={formData.upcoming_treatment_other}
        onChange={handleChange}
      />

      <button onClick={handleSubmit} className="register-button">Submit</button>
    </div>
  );
};

export default HealthForm;
