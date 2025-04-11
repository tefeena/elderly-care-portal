import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      setIsLoggedIn(!!token);
      setUserRole(role);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/login", { replace: true });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Elderly Care
        </Link>
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {isLoggedIn && userRole === "Admin" ? (
            <>
              <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              <Link to="/admin/caregivers" onClick={() => setMenuOpen(false)}>Caregiver List</Link>
              <Link to="/admin/users" onClick={() => setMenuOpen(false)}>User List</Link>
              <Link to="/admin/AdminBookingManager" onClick={() => setMenuOpen(false)}>Caregivers Booking </Link>
              <Link to="/admin/AdminPlanManager" onClick={() => setMenuOpen(false)}>Plan Manager</Link>
            </>
          ) : isLoggedIn ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/caregivers" onClick={() => setMenuOpen(false)}>Caregivers</Link>
              <Link to="/emergency" onClick={() => setMenuOpen(false)}>Emergency</Link>
              <Link to="/health-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/medications" onClick={() => setMenuOpen(false)}>Medication</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/caregivers" onClick={() => setMenuOpen(false)}>Caregivers</Link>
              <Link to="/emergency" onClick={() => setMenuOpen(false)}>Emergency</Link>
            </>
          )}
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
