import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Registration = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '', // Added role field
    });

    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let errors = {};
        
        if (!user.firstName.match(/^[A-Za-z]+$/)) {
            errors.firstName = "First Name should contain only letters.";
        }
        if (!user.lastName.match(/^[A-Za-z]+$/)) {
            errors.lastName = "Last Name should contain only letters.";
        }
        if (!user.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            errors.email = "Enter a valid email address.";
        }
        if (user.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (user.password !== user.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        if (!user.role) {
            errors.role = "Please select a role.";
        }

        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;
      
        const payload = {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          password: user.password,
          role: user.role,
        };
      
        try {
          await axios.post('http://localhost:5000/api/auth/register', payload);
          alert('Registration successful! Please login.');
          navigate('/login');
        } catch (err) {
          alert(err.response?.data?.error || 'Registration failed. Try again.');
        }
      };
      

    return (
        <div className="register-container">
            <h1>Sign Up</h1>
            <h2>Create an Account</h2>

            <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                value={user.firstName} 
                onChange={handleChange} 
                className="input-field" 
            />
            {error.firstName && <p className="error">{error.firstName}</p>}

            <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                value={user.lastName} 
                onChange={handleChange}    
                className="input-field" 
            />
            {error.lastName && <p className="error">{error.lastName}</p>}

            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={user.email} 
                onChange={handleChange} 
                className="input-field" 
            />
            {error.email && <p className="error">{error.email}</p>}

            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={user.password} 
                onChange={handleChange} 
                className="input-field" 
            />
            {error.password && <p className="error">{error.password}</p>}

            <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={user.confirmPassword} 
                onChange={handleChange} 
                className="input-field" 
            />
            {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}

            {/* Role Selection Dropdown */}
            <select 
                name="role" 
                value={user.role} 
                onChange={handleChange} 
                className="input-field"
            >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option> {/* ✅ Ensure it's "User" with capital U */}
            </select>

            {error.role && <p className="error">{error.role}</p>}

            <button onClick={handleRegister} className="register-button">Submit</button>
            <button onClick={() => navigate('/')} className="home-button">Back to Home</button>

            <p>Already have an account? <a href="/login" className="login-link">Login here</a></p>
        </div>
    );
};

export default Registration;
