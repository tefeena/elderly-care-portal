import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useUser } from '../contexts/UserContext';  // Import the UserContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();  // Get the login function from UserContext
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Use the login function from context to save user data
      login(res.data.user);  // Pass user data to context
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      alert('Login successful!');

      if (res.data.user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/health-dashboard');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="Login_container">
      <Navbar />

      <div className="main-container">
        <div className="login">
          <div className="login-container">
            <h2>Login</h2>

            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="input-field"
            />

            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="input-field"
            />

            <button className="login-button" onClick={handleLogin}>Login</button>

            <p className="register-link">
              Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
