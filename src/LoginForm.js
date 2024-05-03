import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';  // Import MUI components
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:7002/login/',  // Django login endpoint
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        onLogin();  // Call parent callback to update login state
        setError(null);
      } else {
        setError('Invalid username or password.');  // Handle login error
      }
    } catch (error) {
      setError('Invalid username or password.');  // Handle login error
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
      <Paper elevation={3} style={{ padding: '2em' }}>  {/* Paper to add some depth */}
        <Typography variant="h4" gutterBottom align="center">Login</Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"  // Outlined style for the text box
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"  // Outlined style for the text box
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: '1em' }}  // Add space above the button
        >
          Login
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

export default LoginForm;
