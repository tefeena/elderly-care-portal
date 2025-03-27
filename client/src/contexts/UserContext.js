import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from localStorage (or make an API call to get user data)
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve from localStorage
    if (storedUser) {
      setUser(storedUser); // Set the logged-in user from localStorage
    }
  }, []); // Run only once when the component mounts

  // Login function: Sets the user and stores the user data in localStorage
  const login = (userData) => {
    // Treat name as userId
    const userWithUserId = {
      userId: userData.name,  // Use 'name' as the userId
      ...userData,
    };

    setUser(userWithUserId);
    localStorage.setItem('user', JSON.stringify(userWithUserId)); // Save user info in localStorage
  };

  // Logout function: Clears the user from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in any component
export const useUser = () => useContext(UserContext);
