import React from "react";
import { Link } from "react-router-dom";
import "./CaregiverDirectory.css";

const CaregiverDirectory = () => {
  return (
    <div className="CaregiverDirectory_container">
      {/* Navbar */}
      <nav className="CaregiverDirectory_navbar">
        <h1 className="CaregiverDirectory_logo">Elderly Care</h1>
        <div className="CaregiverDirectory_nav-links">
          <Link to="/">Home</Link>
          <Link to="/caregivers">Caregivers</Link>
          <Link to="/health-dashboard">Dashboard</Link>
          <Link to="/emergency">Emergency</Link>
          <Link to="/login" className="CaregiverDirectory_btn CaregiverDirectory_login">Login</Link>
          <Link to="/register" className="CaregiverDirectory_btn CaregiverDirectory_signup">Sign Up</Link>
        </div>
      </nav>

      {/* Header Banner */}
      <div className="CaregiverDirectory_banner">
        <img src={require("../images/caregiverbanner.jpg")} alt="Caregiver Banner" className="CaregiverDirectory_banner-img" />
      </div>

      {/* Caregiver List */}
      <div className="CaregiverDirectory_list">
        <h2>Qualified Caregivers</h2>
        <div className="CaregiverDirectory_grid">
          
          {/* Caregiver 1 */}
          <div className="CaregiverDirectory_card">
            <img src={require("../images/caregivers1.jpg")} alt="Caregiver 1" className="CaregiverDirectory_image" />
            <div className="CaregiverDirectory_details">
              <h3>Sarah Johnson</h3>
              <p><strong>Profession:</strong> Senior Nursing Assistant</p>
              <p><strong>Phone:</strong> +1 234 567 8901</p>
              <p><strong>Email:</strong> sarah.johnson@example.com</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>

          {/* Caregiver 2 */}
          <div className="CaregiverDirectory_card">
            <img src={require("../images/caregiver2.webp")} alt="Caregiver 2" className="CaregiverDirectory_image" />
            <div className="CaregiverDirectory_details">
              <h3>Michael Lee</h3>
              <p><strong>Profession:</strong> Home Health Aide</p>
              <p><strong>Phone:</strong> +1 987 654 3210</p>
              <p><strong>Email:</strong> michael.lee@example.com</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>

          {/* Caregiver 3 */}
          <div className="CaregiverDirectory_card">
            <img src={require("../images/caregiver3.jpg")} alt="Caregiver 3" className="CaregiverDirectory_image" />
            <div className="CaregiverDirectory_details">
              <h3>Emma Wilson</h3>
              <p><strong>Profession:</strong> Certified Elderly Care Nurse</p>
              <p><strong>Phone:</strong> +1 555 123 4567</p>
              <p><strong>Email:</strong> emma.wilson@example.com</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>

          {/* Caregiver 4 */}
          <div className="CaregiverDirectory_card">
            <img src={require("../images/caregiver4.jpg")} alt="Caregiver 4" className="CaregiverDirectory_image" />
            <div className="CaregiverDirectory_details">
              <h3>David Brown</h3>
              <p><strong>Profession:</strong> Geriatric Care Specialist</p>
              <p><strong>Phone:</strong> +1 777 888 9999</p>
              <p><strong>Email:</strong> david.brown@example.com</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="CaregiverDirectory_footer">
        <p>&copy; Conestoga College</p>
      </footer>
    </div>
  );
};

export default CaregiverDirectory;
