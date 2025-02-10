import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MedicationPage from './pages/MedicationPage';
import CaregiverDirectory from './pages/CaregiverDirectory';
import HealthDashboard from './pages/HealthDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/medications" element={<MedicationPage />} />
                <Route path="/caregivers" element={<CaregiverDirectory />} />
                <Route path="/health-dashboard" element={<HealthDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
