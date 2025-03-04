import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import './HealthDashboard.css';
import Navbar from "./Navbar";

const HealthDashboard = () => {
    return (
        <div className="Emergency_container">
             {/* Navbar */}
            <Navbar />

            {/* Main Section */}
            <section className="main-section">
                {/* Left Side */}
                <div className="left-section">
                    <h2>Good Morning, John</h2>
                    <p>Here is an overview of your health.</p>

                    <div className="image-container">
                        <img
                            src={require("../images/heartstroke.jpg")}
                            alt="Health Issue"
                            className="profile-img"
                        />
                        <div className="issue-overlay">
                            <h3>⚠️ Issue Found: Heart Stroke</h3>
                            <p>Immediate medical attention required.</p>
                        </div>
                    </div>

                    {/* New Extra Health Info Section */}
                    <div className="extra-health-info">
                        <h3>📌 Additional Health Insights</h3>
                        <ul>
                            <li>✔️ Maintain a balanced diet rich in Omega-3.</li>
                            <li>✔️ Daily 30-minute exercise recommended.</li>
                            <li>✔️ Reduce salt intake to manage blood pressure.</li>
                            {/* <li>✔️ Regular hydration improves circulation.</li> */}
                        </ul>
                    </div>
                </div>

                {/* Right Side */}
                <div className="right-section">
                    <div className="stats-container">
                        <div className="stat-card">
                            <h4>❤️ Heart Rate</h4>
                            <p>130 BPM</p>
                        </div>
                        <div className="stat-card">
                            <h4>🩸 Cholesterol</h4>
                            <p>180 mg/dL</p>
                        </div>
                        <div className="stat-card">
                            <h4>🩺 Glucose</h4>
                            <p>110 mg/dL</p>
                        </div>
                    </div>

                    {/* Reminder + Treatment History & Upcoming Treatments */}
                    <div className="health-section">
                        {/* Today's Reminder */}
                        <div className="reminder-card">
                            <h3><FaRegClock /> Today's Reminder</h3>
                            <p>You have 1 doctor appointment today!</p>

                            <div className="doctor-card">
                                <img
                                    src={require("../images/doctor.jpg")}
                                    alt="Dr. Michael Anderson"
                                    className="doctor-img"
                                />
                                <div className="doctor-details">
                                    <h4>Dr. Michael Anderson</h4>
                                    <p><strong>Specialty:</strong> Cardiologist</p>
                                    <p><strong>Experience:</strong> 20+ years treating heart conditions</p>
                                    <p><strong>Hospital:</strong> St. John's Heart Center</p>
                                </div>
                            </div>
                        </div>

                        {/* Treatment History & Upcoming Treatments */}
                        <div className="treatment-card">
                            <div className="treatment-sections">
                                <div className="treatment-history">
                                    <h4>📜 Treatment History Past</h4>
                                    <ul>
                                        <li>
                                            🦷 Dental Checkup done on
                                            <span>12th Dec 2024</span>
                                            <span> with Dr. MARK MILLS</span>
                                        </li>
                                        <li>
                                            🩺 Cardiologist visit done on
                                            <span> 18th June 2024</span>
                                            <span> with Dr. JOSEPH</span>
                                        </li>
                                        <li>
                                            👓 Eye Exam on 
                                            <span>23rd Oct 2024</span>
                                            <span> with Dr. CATHRINE</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="upcoming-treatments">
                                    <h4>📅 Upcoming Treatment</h4>
                                    <ul>
                                        <li>🦷 Dental Cleaning is on 5th March 2025 <span> with the Dr. MARK MILLS</span></li>
                                        <li>🩺 Cardiologist treatment visit is on 12th March 2025 <span> with the Dr. JOSEPH</span></li>
                                        <li>👓 Eye Checkup is on 25th March 2025 <span> with the Dr. CATHRINE</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sleep Tracker */}
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
                        <p>Sleep is crucial for heart stroke patients as it helps regulate blood pressure and reduces the risk of further cardiovascular complications. 
                            Quality sleep also supports brain recovery and overall heart health by minimizing stress and inflammation.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="Emergency_footer">
                <p>&copy; Conestoga College</p>
            </footer>
        </div>
    );
};

export default HealthDashboard;
