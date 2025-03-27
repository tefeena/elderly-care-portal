import React, { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import './HealthDashboard.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';
import { useUser } from '../contexts/UserContext'; // Importing useUser context

const HealthDashboard = () => {
    const { user } = useUser(); // Get logged-in user from context
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Debugging: Log user data to inspect its value
    console.log("User data:", user);

    // Fetch health data on component mount
    useEffect(() => {
        if (!user) return;

        const userId = user.id; // Assuming 'user.id' is unique to the logged-in user

        axios.get(`/api/healthdata/${userId}`)
            .then(response => {
                setHealthData(response.data);
                setLoading(false);
                if (!response.data) {
                    setShowForm(true);
                }
            })
            .catch(err => {
                console.error('Error fetching health data:', err);
                setLoading(false);
                setShowForm(true);
            });
    }, [user]);

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userId = user.id;

        const newHealthData = {
            blood_pressure: e.target.blood_pressure.value,
            heart_rate: e.target.heart_rate.value,
            glucose_level: e.target.glucose_level.value,
            temperature: e.target.temperature.value,
            cholesterol: e.target.cholesterol.value,
            issue: e.target.issue.value,
            reminder: e.target.reminder.value,
            treatmentHistory: e.target.treatmentHistory.value.split(','),
            upcomingTreatments: e.target.upcomingTreatments.value.split(','),
        };

        if (!newHealthData.blood_pressure || !newHealthData.heart_rate || !newHealthData.glucose_level) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        setErrorMessage('');

        axios.post(`/api/healthdata/${userId}`, newHealthData)
            .then(response => {
                setHealthData(response.data);
                setShowForm(false);
            })
            .catch(err => {
                console.error('Error saving health data:', err);
                setErrorMessage('Error saving data. Please try again later.');
            });
    };

    return (
        <div className="Emergency_container">
            <Navbar />
            <section className="main-section">
                <div className="left-section">
                    {/* Display user name or 'Guest' if user is not logged in */}
                    <h2>Good Morning, {user ? user.name : 'Guest'}</h2>
                    <p>Here is an overview of your health.</p>
                    <div className="image-container">
                        <img src={require("../images/heartstroke.jpg")} alt="Health Issue" className="profile-img" />
                        <div className="issue-overlay">
                            <h3>⚠️ Issue Found: {healthData?.issue || 'No issues found'}</h3>
                            <p>{healthData?.reminder || 'Stay healthy and take care!'}</p>
                        </div>
                    </div>

                    <div className="extra-health-info">
                        <h3>📌 Additional Health Insights</h3>
                        <ul>
                            <li>✔️ Maintain a balanced diet rich in Omega-3.</li>
                            <li>✔️ Daily 30-minute exercise recommended.</li>
                            <li>✔️ Reduce salt intake to manage blood pressure.</li>
                        </ul>
                    </div>
                </div>

                <div className="right-section">
                    <div className="stats-container">
                        <div className="stat-card"><h4>❤️ Heart Rate</h4><p>{healthData?.heart_rate || 'Not Available'}</p></div>
                        <div className="stat-card"><h4>🩸 Cholesterol</h4><p>{healthData?.cholesterol || 'Not Available'}</p></div>
                        <div className="stat-card"><h4>🩺 Glucose</h4><p>{healthData?.glucose_level || 'Not Available'}</p></div>
                    </div>

                    <div className="health-section">
                        <div className="reminder-card">
                            <h3><FaRegClock /> Today's Reminder</h3>
                            <p>{healthData?.reminder || 'No appointments today.'}</p>
                        </div>

                        <div className="treatment-card">
                            <h4>📜 Treatment History</h4>
                            <ul>
                                {healthData?.treatmentHistory?.length > 0 ? (
                                    healthData.treatmentHistory.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))
                                ) : (
                                    <li>No past treatments recorded.</li>
                                )}
                            </ul>

                            <h4>📅 Upcoming Treatment</h4>
                            <ul>
                                {healthData?.upcomingTreatments?.length > 0 ? (
                                    healthData.upcomingTreatments.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))
                                ) : (
                                    <li>No upcoming treatments scheduled.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {showForm && (
                <div className="health-form-popup">
                    <div className="form-overlay">
                        <h2>Enter Your Health Data</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <form onSubmit={handleFormSubmit}>
                            <label>Blood Pressure:</label>
                            <input type="text" name="blood_pressure" placeholder="Enter your blood pressure" required />
                            <label>Heart Rate:</label>
                            <input type="text" name="heart_rate" placeholder="Enter your heart rate" required />
                            <label>Glucose Level:</label>
                            <input type="text" name="glucose_level" placeholder="Enter your glucose level" required />
                            <label>Temperature:</label>
                            <input type="text" name="temperature" placeholder="Enter your body temperature" required />
                            <label>Cholesterol:</label>
                            <input type="text" name="cholesterol" placeholder="Enter your cholesterol level" required />
                            <label>Issue:</label>
                            <input type="text" name="issue" placeholder="Enter any health issues" required />
                            <label>Reminder:</label>
                            <input type="text" name="reminder" placeholder="Enter any reminders" required />
                            <label>Treatment History:</label>
                            <textarea name="treatmentHistory" placeholder="Describe past treatments (comma separated)" />
                            <label>Upcoming Treatments:</label>
                            <textarea name="upcomingTreatments" placeholder="Describe upcoming treatments (comma separated)" />
                            <button type="submit">Save Data</button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default HealthDashboard;
