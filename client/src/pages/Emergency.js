import React from "react";
import { Link } from "react-router-dom";
import "./Emergency.css";

const EmergencyPage = () => {
  return (
    <div className="Emergency_container">
      {/* Navigation Bar */}
      <nav className="Emergency_navbar">
        <h1 className="Emergency_logo">Elderly Care</h1>
        <div className="Emergency_nav-links">
          <Link to="/">Home</Link>
          <Link to="/caregivers">Caregivers</Link>
          <Link to="/health-dashboard">Dashboard</Link>
          <Link to="/emergency">Emergency</Link>
          <Link to="/login" className="Emergency_btn Emergency_login">Login</Link>
          <Link to="/register" className="Emergency_btn Emergency_signup">Sign Up</Link>
        </div>
      </nav>

   
      <section className="Emergency_section">
        <h2>🚨 Emergency Assistance</h2>
        <p>If you or someone you know is in immediate danger, please use the options below for quick access to emergency services.</p>

        <div className="Emergency_options">
          <div className="Emergency_option">
            <h3>📞 Call Emergency Services</h3>
            <p>For immediate assistance, dial your local emergency services.</p>
            <a href="tel:911" className="Emergency_call-btn">Call 911</a>
          </div>

          <div className="Emergency_option">
            <h3>💬 Contact Caregivers</h3>
            <p>If you need caregiver support, contact one of our trusted caregivers.</p>
            <Link to="/caregivers" className="Emergency_link">Find a Caregiver</Link>
          </div>

          <div className="Emergency_option">
            <h3>🔗 Emergency Contacts</h3>
            <p>Access your personal emergency contacts quickly.</p>
            <Link to="/health-dashboard" className="Emergency_link">View Contacts</Link>
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

export default EmergencyPage;
