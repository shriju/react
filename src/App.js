import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginAndRegisterForm from './LoginandRegisterForm';
import ScoreForm from './Score1';
import LogoutButton from './LogOutButton';
import Header from './Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = 'Score Calculation App'; // Set the document title
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header /> {/* Place the header at the top of the app */}
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/score" /> : <LoginAndRegisterForm onLogin={handleLogin} />
          }
        />
        <Route
          path="/score"
          element={
            isLoggedIn ? <ScoreForm handleLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/logout"
          element={
            isLoggedIn ? <LogoutButton onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
