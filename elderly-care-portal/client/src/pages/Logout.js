import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token'); // Clear auth token
        alert('Logged out successfully!');
        navigate('/login');
    }, [navigate]);

    return <p>Logging out...</p>;
};
<footer className="Emergency_footer">
    <p>&copy; Conestoga College</p>
</footer>

export default Logout;