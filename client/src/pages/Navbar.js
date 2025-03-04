import { Link } from "react-router-dom";
import "./Navbar.css";  // Create a separate CSS file for navbar styles

const Navbar = () => {
  return (
    <nav className="home-navbar">
      <h1 className="home-logo">Elderly Care</h1>
      <div className="home-nav-links">
        <Link to="/">Home</Link>
        <Link to="/caregivers">Caregivers</Link>
        <Link to="/health-dashboard">Dashboard</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/medications">Medication</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
