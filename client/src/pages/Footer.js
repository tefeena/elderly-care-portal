import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Navigation Links */}
        <div className="footer-nav">
          <h3>Quick Links</h3>
          <ul>
            {isLoggedIn && userRole === "Admin" ? (
              <>
                <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                <li><Link to="/admin/caregivers">Caregiver List</Link></li>
                <li><Link to="/admin/users">User List</Link></li>
              </>
            ) : isLoggedIn ? (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/caregivers">Caregivers</Link></li>
                <li><Link to="/health-dashboard">Health Dashboard</Link></li>
                <li><Link to="/medications">Medication</Link></li>
                <li><Link to="/emergency">Emergency</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/caregivers">Caregivers</Link></li>
                <li><Link to="/emergency">Emergency</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><strong>Address:</strong> 123 Elderly Care Street, Toronto, ON</p>
          <p><strong>Email:</strong> <a href="mailto:support@elderlycare.com">support@elderlycare.com</a></p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Elderly Care - Group 4 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
