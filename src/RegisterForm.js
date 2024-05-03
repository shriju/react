import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:7002/register/',  // Django registration endpoint
        {
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        setError(null);
        onRegister();  // Trigger callback upon successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"  // Full height to center everything
      bgcolor="#f5f5f5"  // Light gray background
    >
      <Paper elevation={3} style={{ padding: '2em' }}>
        <Typography variant="h4" gutterBottom align="center">Register</Typography>

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
          style={{ marginTop: '1em' }}
        >
          Register
        </Button>

        {error && (
          <Typography color="error" align="center" style={{ marginTop: '1em' }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterForm;
