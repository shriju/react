// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material'; // Import AppBar and Toolbar

const Header = () => (
  <AppBar position="static" color="primary"> {/* Set the position to "static" for a consistent top header */}
    <Toolbar>
      <Typography variant="h5" style={{ flex: 1 }} align="center"> {/* Ensure title is centered */}
        Score Calculation App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
