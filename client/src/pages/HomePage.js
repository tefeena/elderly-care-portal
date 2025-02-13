import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import external CSS file

const HomePage = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Welcome to the Elderly Care Portal</h1>
            </header>

            <nav className="navbar">
                <ul className="nav-list left-nav">
                    <li><Link to="/" className="nav-item">Home</Link></li>
                    <li><Link to="/medications" className="nav-item">Medication Management</Link></li>
                    <li><Link to="/caregivers" className="nav-item">Caregiver Directory</Link></li>
                    <li><Link to="/health-dashboard" className="nav-item">Health Dashboard</Link></li>
                </ul>

                <ul className="nav-list right-nav">
                    <li><Link to="/register" className="nav-item">Register</Link></li>
                    <li><Link to="/login" className="nav-item">Login</Link></li>
                    <li><Link to="/logout" className="nav-item">Logout</Link></li>
                </ul>
            </nav>

            <main className="main-content">
                <p>
                    This portal helps elderly individuals and caregivers manage health records, medications, and more. 
                    Please register or log in to access all features.
                </p>
            </main>
        </div>
    );
};

export default HomePage;
