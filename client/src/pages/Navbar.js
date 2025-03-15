import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
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
    localStorage.removeItem("role"); // Remove user role on logout
    setIsLoggedIn(false);
    setUserRole(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Elderly Care
        </Link>

        <div className="nav-links">
          {/* If the user is an Admin, show Admin links */}
          {userRole === "Admin" ? (
            <>
              <Link to="/admin-dashboard">Admin Home</Link>
              <Link to="/admin/caregivers">Caregiver List</Link>
              <Link to="/admin/users">User List</Link>
            </>
          ) : (
            // If the user is not an Admin, show regular links
            <>
              <Link to="/">Home</Link>
              <Link to="/caregivers">Caregivers</Link>
              <Link to="/health-dashboard">Dashboard</Link>
              <Link to="/emergency">Emergency</Link>
              <Link to="/medications">Medication</Link>
            </>
          )}

          {/* Show Login/Logout button based on authentication status */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
