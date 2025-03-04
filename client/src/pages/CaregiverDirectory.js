import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; 
import "./CaregiverDirectory.css";

const CaregiverDirectory = () => {
  return (
    <div className="caregiver-container">
      <Navbar />

      {/* Banner Section */}
      <header className="caregiver-banner">
        <h1>IN-HOME CAREGIVERS</h1>
      </header>

      {/* Qualified Caregivers Section */}
      <section className="qualified-caregivers">
        <h2>Qualified Caregivers</h2>
        <div className="caregiver-grid">
          <div className="caregiver-card">
            <img src={require("../images/caregiver1.jpeg")} alt="Caregiver 1" />
            <div className="caregiver-info">
              <h3>John Doe</h3>
              <p>Experienced in elderly care, compassionate and dedicated.</p>
            </div>
          </div>

          <div className="caregiver-card">
            <div className="caregiver-info">
              <h3>Jane Smith</h3>
              <p>Specialist in Alzheimer's care, ensures patient comfort.</p>
            </div>
            <img src={require("../images/caregiver2.jpeg")} alt="Caregiver 2" />
          </div>

          <div className="caregiver-card">
            <img src={require("../images/caregiver3.jpeg")} alt="Caregiver 3" />
            <div className="caregiver-info">
              <h3>David Johnson</h3>
              <p>Certified nurse, skilled in mobility assistance and care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Register as a Caregiver Section */}
      <section className="register-caregiver">
        <h2>Register as a Caregiver</h2>
        <form className="caregiver-form">
          <label>First Name:</label>
          <input type="text" placeholder="Enter First Name" />

          <label>Last Name:</label>
          <input type="text" placeholder="Enter Last Name" />

          <label>Email:</label>
          <input type="email" placeholder="Enter Email" />

          <label>Phone Number:</label>
          <input type="text" placeholder="Enter Phone Number" />

          <label>How Can We Help?</label>
          <textarea placeholder="Describe your skills and experience"></textarea>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </section>

      {/* Client Caregiver Reviews Section */}
      <section className="caregiver-reviews">
        <h2>Client Caregiver Reviews</h2>
        <div className="review-grid">
          <div className="review-card">
            <p>"John was very kind and professional. Highly recommend!"</p>
            <span>- Emily R.</span>
          </div>
          <div className="review-card">
            <p>"Jane provided excellent care for my father. So grateful!"</p>
            <span>- Mark W.</span>
          </div>
          <div className="review-card">
            <p>"David made sure my mother was comfortable and happy."</p>
            <span>- Sarah L.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="caregiver-footer">
        <p>&copy; 2025 Elderly Care Platform</p>
      </footer>
    </div>
  );
};

export default CaregiverDirectory;
