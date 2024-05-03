// LoginAndRegisterForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';

const LoginAndRegisterForm = ({ onLogin }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setError(null);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:7002/login/',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        onLogin();
        setError(null);
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      setError("Passwords must match.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:7002/register/',
        {
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        setTabIndex(0); // Switch back to the login tab
        setError("Registration successful. Please log in.");
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Registration failed.'
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} style={{ padding: '2em', minWidth: '400px' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tabIndex === 0 ? (
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ marginTop: '1em' }}
            >
              Login
            </Button>
          </Box>
        ) : (
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              value={password}
                
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        )}

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginAndRegisterForm;
