import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token'); // Clear auth token
        window.dispatchEvent(new Event("storage")); 
        alert('Logged out successfully!');
        navigate('/login', { replace: true }); // Redirect to login page
    }, [navigate]);

    return null; 
};

export default Logout;
