import React from "react";
import { Link } from "react-router-dom";
import "./Emergency.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EmergencyPage = () => {
  return (
    <div className="Emergency_container">
      
      <Navbar /> 

    
      <section className="Emergency_banner">
        <h1> Emergency Assistance</h1>
      </section>

      <section className="Emergency_access">
      <img src={require("../images/emergency.png")} alt="emergency_assistance"
       className="Emergency_image" />
       
        <div className="Emergency_info">
          <h2>Need Emergency Help?</h2>
          <p>If you or someone you know is in immediate danger, use the options below for quick access to emergency services.</p>

          <div className="Emergency_buttons">
            <a href="tel:911" className="Emergency_call-btn">Call 911</a>
            <Link to="/caregivers" className="Emergency_link">Find a Caregiver</Link>
            <Link to="/health-dashboard" className="Emergency_link">View Emergency Contacts</Link>
          </div>
        </div>
      </section>

      <section className="Emergency_intro">
        <h1>Our Emergency Services</h1>
        <p>
          At Elderly Care, we understand that emergencies can happen at any time, and being prepared is crucial. Our dedicated network of support services is designed to provide immediate and efficient assistance to both you and your loved ones. Whether it’s providing access to essential meals, offering transportation services, or connecting you with trained caregivers, we are committed to making sure that help is always within reach. In times of crisis, knowing where to turn can make all the difference, which is why our comprehensive support system is built to offer peace of mind. Explore the wide range of services available, designed to cater to various emergency needs, ensuring that you and your family have the resources necessary to navigate through any situation.
        </p>
      </section>

      <section className="Emergency_services">
        <div className="Emergency_grid">
          <div className="Emergency_service">Meals & Food Security</div>
          <div className="Emergency_service">Transportation Services</div>
          <div className="Emergency_service">Personal Support Services</div>
          <div className="Emergency_service">Support Groups</div>
          <div className="Emergency_service">Exercise Programs</div>
          <div className="Emergency_service">Day Programs & Respite</div>
        </div>
      </section>

      <section className="Emergency_assistance">
        <h2>Need Assistance?</h2>
        <p>Contact us anytime for support and emergency help.</p>
        <a href="tel:911" className="Emergency_call-btn">Call Now</a>
      </section>

      <section className="Emergency_contact">
        <div className="Emergency_contact-box">
          <h3>📍 Location</h3>
          <p>13 King Street, Waterloo, Ontario, Canada</p>
        </div>
        <div className="Emergency_contact-box">
          <h3>📞 Contact</h3>
          <p>+1 (274)-567-898</p>
        </div>
        <div className="Emergency_contact-box">
          <h3>📧 Email</h3>
          <p>support@elderlycare.com</p>
        </div>
      </section>


      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EmergencyPage;
