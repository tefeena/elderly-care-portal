import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";  // Ensure you use the updated Navbar.css

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Elderly Care
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/caregivers" onClick={() => setMenuOpen(false)}>Caregivers</Link>
          <Link to="/health-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/emergency" onClick={() => setMenuOpen(false)}>Emergency</Link>
          <Link to="/medications" onClick={() => setMenuOpen(false)}>Medication</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="cta-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
        </div>

        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
