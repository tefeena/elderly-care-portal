import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthDashboard = () => {
    const [healthData, setHealthData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/health/data')
            .then(response => setHealthData(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Health Dashboard</h2>
            <p>Blood Pressure: {healthData.blood_pressure}</p>
            <p>Heart Rate: {healthData.heart_rate} BPM</p>
            <p>Glucose Level: {healthData.glucose_level} mg/dL</p>
            <p>Temperature: {healthData.temperature} °C</p>
        </div>
    );
};

export default HealthDashboard;

  
