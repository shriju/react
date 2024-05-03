import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'; // Import Box and Typography for layout and text
import LoginAndRegisterForm from './LoginandRegisterForm';
import ScoreForm from './Score1';
import LogoutButton from './LogOutButton';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = 'Score Calculation App'; // Set the document title
  }, []); // Empty array ensures this effect runs only once when the component mounts

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    // After registration, you might want to redirect to the login page or set login state
    setIsLoggedIn(false); // Keep as logged out
  };

  return (
    <Router>
      {/* Add a Box to create a header */}
      <Box 
        textAlign="center" 
        p={2} // Padding for spacing
        bgcolor="#f5f5f5" // Light background color
      >
        <Typography variant="h4">Score Calculation App</Typography> {/* Title */}
      </Box>
      
      {/* App routes */}
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/score" /> : <LoginAndRegisterForm onLogin={handleLogin} onRegister={handleRegister} />}
        />

        <Route
          path="/score"
          element={isLoggedIn ? <ScoreForm handleLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        <Route
          path="/logout"
          element={isLoggedIn ? <LogoutButton onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
