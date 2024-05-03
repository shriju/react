// LogoutButton.js
import React from 'react';
import axios from 'axios';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:7002/logout');  // Django logout endpoint
      onLogout();  // Call parent callback to update login state
    } catch (error) {
      console.error('Error during logout:', error);  // Handle logout error
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
