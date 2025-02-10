import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Elderly Care Portal</h1>
            <nav>
                <ul>
                    <li><Link to="/medications">Medication Management</Link></li>
                    <li><Link to="/caregivers">Caregiver Directory</Link></li>
                    <li><Link to="/health-dashboard">Health Dashboard</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
