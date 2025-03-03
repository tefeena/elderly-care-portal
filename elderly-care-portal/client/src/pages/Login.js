import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Using the same styles
import './Emergency.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Login successful!');
            navigate('/health-dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="Login_container">
            {/* Navbar */}
            <nav className="Emergency_navbar">
            <h1 className="Emergency_logo">Elderly Care</h1>
                <div className="Emergency_nav-links">
                          <Link to="/">Home</Link>
                          <Link to="/emergency">Emergency</Link>
                          <Link to="/login" className="Emergency_btn Emergency_login">Login</Link>
                          <Link to="/register" className="Emergency_btn Emergency_signup">Sign Up</Link>
                        </div>
            </nav>

            {/* Login Form */}
            <h1 className='login-title'>Welcome to Login page</h1>
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
                <footer className="Emergency_footer">
                    <p>&copy; Conestoga College</p>
                </footer>
        </div>
    );
};

export default Login;
