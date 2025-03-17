import { Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import "./HomePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LoggedInHomePage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve stored user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar /> 

      {/* Welcome Banner */}
      <header className="home-banner">
        <div className="home-banner-overlay">
          <h2>Welcome Back, {userName || "User"}!</h2>
          <p>Manage your care, track your health, and stay connected.</p>
          <Link to="/health-dashboard" className="home-btn home-get-started">Go to Dashboard</Link>
        </div>
      </header>

    {/* Quick Access Section */}
<section className="quick-access">
  <div className="quick-access-container">
    <h2>Quick Actions</h2>
    <p>Access your most important features instantly.</p>
    <div className="quick-access-grid">
      <Link to="/medications" className="quick-access-item">
        <div className="icon-container">
          <img src={require("../images/medications-icon.jpeg")} alt="Medications" />
        </div>
        <span>Manage Medications</span>
      </Link>

      <Link to="/caregivers" className="quick-access-item">
        <div className="icon-container">
          <img src={require("../images/caregivers-icon.jpeg")} alt="Caregivers" />
        </div>
        <span>Find Caregivers</span>
      </Link>

      <Link to="/health-dashboard" className="quick-access-item">
        <div className="icon-container">
          <img src={require("../images/health-dashboard-icon.jpeg")} alt="Health Dashboard" />
        </div>
        <span>View Health Dashboard</span>
      </Link>

      <Link to="/emergency" className="quick-access-item">
        <div className="icon-container">
          <img src={require("../images/emergency.png")} alt="Emergency Assistance" />
        </div>
        <span>Emergency Assistance</span>
      </Link>
    </div>
  </div>
</section>


      {/* Personalized Care */}
      <section className="home-services">
        <h2>Your Personalized Care</h2>
        <p>Track your health, manage appointments, and get real-time assistance.</p>
        <Link to="/health-dashboard" className="service-btn">Manage Your Care</Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoggedInHomePage;
