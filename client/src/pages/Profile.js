import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // If you're using context for managing user state

const Profile = () => {
    const { user } = useUser(); // Get user data from context
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login page if no user is logged in
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-details">
                    <h2>Profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    {/* You can add more user details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
