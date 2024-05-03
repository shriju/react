import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Header from './Header';

const ScoreForm = ({ handleLogout }) => {
  const [name, setName] = useState(''); // State for "Name"
  const [question, setQuestion] = useState('');
  const [referenceAnswer, setReferenceAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleScoreCalculation = async () => {
    if (
      !name.trim() ||
      !question.trim() ||
      !referenceAnswer.trim() ||
      !userAnswer.trim()
    ) {
      setErrorMessage("All fields must be provided.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:7002/api/score',
        {
          name,
          question,
          reference_answer: referenceAnswer,
          answer: userAnswer,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      setScore(response.data.score);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error calculating score. Please try again.");
    }
  };

  const handleLogoutClick = () => {
    if (typeof handleLogout === 'function') {
      handleLogout();
      navigate('/login');
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* <Header /> Topmost header */}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Name" // New text field for "Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Reference Answer"
            variant="outlined"
            fullWidth
            value={referenceAnswer}
            onChange={(e) => setReferenceAnswer(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="User Answer"
            variant="outlined"
            fullWidth
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleScoreCalculation}>
            Calculate Score
          </Button>
        </Grid>
      </Grid>

      {errorMessage && (
        <Typography color="error" align="center">
          {errorMessage}
        </Typography>
      )}

      {score !== null && (
        <Box mt={4}>
          <Typography variant="h6">Score:</Typography>
          <Typography>Your score in percentage is: {score.toFixed(2) * 100} percent.</Typography>
        </Box>
      )}

      <Box mt={4}>
        <Button variant="contained" color="secondary" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ScoreForm;
