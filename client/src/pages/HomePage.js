import { Link } from "react-router-dom";
import "./HomePage.css"; 

const HomePage = () => {
  return (
    <div className="Home_container">
      <nav className="Home_navbar">
        <h1 className="Home_logo">Elderly Care</h1>
        <div className="Home_nav-links">
          <Link to="/">Home</Link>
          <Link to="/caregivers">Caregivers</Link>
          <Link to="/health-dashboard">Dashboard</Link>
          <Link to="/emergency" className="Home_emergency">Emergency</Link>
          <Link to="/login" className="Home_btn Home_login">Login</Link>
          <Link to="/register" className="Home_btn Home_signup">Sign Up</Link>
        </div>
      </nav>

      <header className="Home_hero">
        <h2>Caring for Seniors, Simplifying Care</h2>
        <p>Empowering elderly individuals with safety, healthcare, and independence.</p>
        <Link to="/register" className="Home_btn Home_get-started">Get Started</Link>
      </header>

    
      <section className="Home_features">
        <div className="Home_feature">
          <h3>📅 Medication Management</h3>
          <p>Set reminders for medications and track schedules with ease.</p>
          <Link to="/medications">Learn More →</Link>
        </div>
        <div className="Home_feature">
          <h3>👩‍⚕️ Caregiver Directory</h3>
          <p>Find and book trusted caregivers for assistance.</p>
          <Link to="/caregivers">Find Caregivers →</Link>
        </div>
        <div className="Home_feature">
          <h3>📊 Health Dashboard</h3>
          <p>Monitor health metrics and get real-time insights.</p>
          <Link to="/health-dashboard">View Dashboard →</Link>
        </div>
      </section>

      <section className="Home_emergency-section">
        <h2>🚨 Emergency Assistance</h2>
        <p>Instant access to emergency contacts and services.</p>
        <Link to="/emergency" className="Home_btn Home_emergency-btn">Get Help Now</Link>
      </section>

      <footer className="Home_footer">
        <p>&copy; Conestoga College</p>
      </footer>
    </div>
  );
};

export default HomePage;
