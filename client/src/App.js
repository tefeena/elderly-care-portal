import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MedicationPage from './pages/MedicationPage';
import CaregiverDirectory from './pages/CaregiverDirectory';
import HealthDashboard from './pages/HealthDashboard';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout'; 
import AdminDashboard from "./pages/AdminDashboard";
import CaregiverList from "./pages/CaregiverList";
import UserList from "./pages/UserList";
import LoggedInHomePage from './pages/LoggedInHomePage';
import HealthForm from './pages/HealthForm';
import CaregiverBooking from './pages/CaregiverBooking';
import PaymentPage from './pages/PaymentPage';
import AdminBookingManager from './pages/AdminBookingManager';
import AdminPlanManager from './pages/AdminPlanManager';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/medications" element={<MedicationPage />} />
                <Route path="/caregivers" element={<CaregiverDirectory />} />
                <Route path="/health-dashboard" element={<HealthDashboard />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} /> 
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin/caregivers" element={<CaregiverList />} />
                <Route path="/admin/users" element={<UserList />} />
                <Route path="/health-form" element={<HealthForm />} />
                <Route path="/logged-in-home" element={<LoggedInHomePage />} />
                <Route path="/caregivers/book/:id" element={<CaregiverBooking />} />
                <Route path="/caregivers/payment/:id" element={<PaymentPage />} />
                <Route path="/admin/AdminBookingManager" element={<AdminBookingManager />} />
                <Route path="/admin/AdminPlanManager" element={<AdminPlanManager />} />
            </Routes>
        </Router>
    );
};

export default App;
