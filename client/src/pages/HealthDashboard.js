import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import './HealthDashboard.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
const API_BASE = process.env.REACT_APP_API_BASE_URL;
const HealthDashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [user, setUser] = useState(null);
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    axios.get('${API_BASE}/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error('Error fetching user info:', err));

    axios.get('${API_BASE}/api/health/data', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setHealthData(res.data);
      if (res.data.prediction) {
        setPrediction(res.data.prediction);
      }
    })
    .catch(err => console.error('Error fetching health data:', err));
  }, []);

  return (
    <div className="Emergency_container">
      <Navbar />
      <section className="main-section">
        <div className="left-section">
          <div className="dashboard-header-row">
            <div className="left-text">
              <h2>Good Morning, {user?.name || "User"}</h2>
              <p>Here is an overview of your health.</p>
            </div>
            <div className="add-button-wrapper">
              <Link to="/health-form">
                <button className="add-health-btn">Add Health Data</button>
              </Link>
            </div>
          </div>

          <div className="image-container">
            <img
              src={require("../images/heartstroke.jpg")}
              alt="Health Issue"
              className="profile-img"
            />
            <div className="issue-overlay">
              <h3>
                {healthData?.blood_pressure > 200
                  ? "⚠️ Issue Found: High Blood Pressure"
                  : "No Critical Issues"}
              </h3>
              <p>
                {healthData?.blood_pressure > 200
                  ? "Immediate medical attention required."
                  : "Your current readings are within normal range."}
              </p>
            </div>
          </div>

          <div className="extra-health-info">
            <h3>📌 Additional Health Insights</h3>
            <ul>
              <li>Maintain a balanced diet rich in Omega-3.</li>
              <li>Daily 30-minute exercise recommended.</li>
              <li>Reduce salt intake to manage blood pressure.</li>
            </ul>
            {prediction && (
              <div className="prediction-box">
                <h4>🤖 Gemini AI Prediction</h4>
                <p>{prediction}</p>
              </div>
            )}
          </div>
        </div>

        <div className="right-section">
          <div className="stats-container">
            <div className="stat-card">
              <h4>❤️ Heart Rate</h4>
              <p>{healthData ? `${healthData.heart_rate} BPM` : "-"}</p>
            </div>
            <div className="stat-card">
              <h4>🩸 Cholesterol</h4>
              <p>{healthData ? `${healthData.cholesterol} mg/dL` : "-"}</p>
            </div>
            <div className="stat-card">
              <h4>🩺 Glucose</h4>
              <p>{healthData ? `${healthData.glucose_level} mg/dL` : "-"}</p>
            </div>
            <div className="stat-card">
              <h4>  🌡️ Body Temperature </h4>
              <p>{healthData ? `${healthData.temperature} (°C)` : "-"}</p>
            </div>
          </div>

          <div className="health-section">
            <div className="reminder-card">
              <h3><FaRegClock /> Today's Reminder</h3>
              <p>You have 1 doctor appointment today!</p>
              <div className="doctor-card">
                <img
                  src={require("../images/doctor.jpg")}
                  alt="Doctor"
                  className="doctor-img"
                />
                <div className="doctor-details">
                  <h4>{healthData?.doctor_name || "Doctor Name"}</h4>
                  <p><strong>Specialty:</strong> {healthData?.doctor_specialty || "-"}</p>
                  <p><strong>Experience:</strong> {healthData?.doctor_experience || "-"}</p>
                  <p><strong>Hospital:</strong> {healthData?.doctor_hospital || "-"}</p>
                </div>
              </div>
            </div>

            <div className="treatment-card">
              <div className="treatment-sections">
                <div className="treatment-history">
                  <h4>📜 Treatment History Past</h4>
                  <ul>
                    <li>Dental: {healthData?.treatment_history?.dental || "-"}</li>
                    <li>Eye: {healthData?.treatment_history?.eye || "-"}</li>
                    <li>Other: {healthData?.treatment_history?.other || "-"}</li>
                  </ul>
                </div>

                <div className="upcoming-treatments">
                  <h4>📅 Upcoming Treatment</h4>
                  <ul>
                    <li>Dental: {healthData?.upcoming_treatment?.dental || "-"}</li>
                    <li>Eye: {healthData?.upcoming_treatment?.eye || "-"}</li>
                    <li>Other: {healthData?.upcoming_treatment?.other || "-"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="sleep-card">
            <h3>🛏️ Sleep Tracker</h3>
            <div className="sleep-timeline">
              <div className="sleep-dot completed"></div>
              <div className="sleep-line"></div>
              <div className="sleep-dot completed"></div>
              <div className="sleep-line"></div>
              <div className="sleep-dot completed"></div>
              <div className="sleep-line"></div>
              <div className="sleep-dot"></div>
            </div>
            <p>7 hours 18 minutes</p>
            <p>
              Sleep is crucial for heart stroke patients as it helps regulate blood pressure and reduces the risk of further cardiovascular complications. Quality sleep also supports brain recovery and overall heart health.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HealthDashboard;
