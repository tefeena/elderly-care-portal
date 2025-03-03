import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MedicationPage from './pages/MedicationPage';
import CaregiverDirectory from './pages/CaregiverDirectory';
import HealthDashboard from './pages/HealthDashboard';
import Emergency from './pages/Emergency';  // Corrected import for Emergency.js
import Login from './pages/Login';  // Corrected import for Login.js
import Register from './pages/Register';  // Corrected import for Register.js

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/medications" element={<MedicationPage />} />
                <Route path="/caregivers" element={<CaregiverDirectory />} />
                <Route path="/health-dashboard" element={<HealthDashboard />} />
                <Route path="/emergency" element={<Emergency />} />  {/* Updated for Emergency.js */}
                <Route path="/login" element={<Login />} />  {/* Updated for Login.js */}
                <Route path="/register" element={<Register />} />  {/* Updated for Register.js */}
            </Routes>
        </Router>
    );
};

export default App;
