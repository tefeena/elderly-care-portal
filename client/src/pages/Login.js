import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Using same CSS file for styling

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

            {/* <p className="forgot-password" onClick={() => alert("Redirecting to forgot password page...")}>
                Forgot Password?
            </p> */}

            <button className="login-button" onClick={handleLogin}>Login</button>

            <p className="register-link">
                Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
            </p>
        </div>
    );
};

export default Login;
