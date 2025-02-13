import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Emergency.css'; 

const HealthDashboard = () => {
    const [healthData, setHealthData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/health/data')
            .then(response => setHealthData(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="Emergency_container">
       
            <nav className="Emergency_navbar">
                <h1 className="Emergency_logo">Elderly Care</h1>
                <div className="Emergency_nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/caregivers">Caregivers</Link>
                    <Link to="/health-dashboard">Dashboard</Link>
                    <Link to="/login" className="Emergency_btn Emergency_login">Login</Link>
                    <Link to="/register" className="Emergency_btn Emergency_signup">Sign Up</Link>
                </div>
            </nav>

            <section className="Emergency_section">
                <h2>🩺 Health Dashboard</h2>
                <p><strong>Blood Pressure:</strong> {healthData.blood_pressure}</p>
                <p><strong>Heart Rate:</strong> {healthData.heart_rate} BPM</p>
                <p><strong>Glucose Level:</strong> {healthData.glucose_level} mg/dL</p>
                <p><strong>Temperature:</strong> {healthData.temperature} °C</p>
            </section>

            <footer className="Emergency_footer">
                <p>&copy;Conestoga College</p>
            </footer>
        </div>
    );
};

export default HealthDashboard;
