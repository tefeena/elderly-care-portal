// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import MedicationPage from './pages/MedicationPage';
// import CaregiverDirectory from './pages/CaregiverDirectory';
// import HealthDashboard from './pages/HealthDashboard';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Logout from './pages/Logout';
// import Dashboard from './pages/HealthDashboard';

// const PrivateRoute = ({ children }) => {
//     return localStorage.getItem('token') ? children : <Navigate to="/login" />;
// };

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/medications" element={<MedicationPage />} />
//                 <Route path="/caregivers" element={<CaregiverDirectory />} />
//                 <Route path="/health-dashboard" element={<HealthDashboard />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//                 <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Registration from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import HealthDashboard from './pages/HealthDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/health-dashboard" element={<HealthDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
