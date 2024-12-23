import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (!email || !password || !name) {
      setError("All fields are required.");
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // Static URL for local development
      const response = await axios.post('http://localhost:5000/api/users', { email, password, name });
      if (response.status === 201) { // Status code for successful creation
        alert('Registration successful. Please login.');
        navigate('/');  // Redirect to login page
      }
    } catch (error) {
      // Better error handling with detailed error message
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
      console.error('Registration failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ p: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      
      {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
      
      <form onSubmit={handleRegister}>
        <Box mb={2}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}  // Disable input while loading
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}  // Disable input while loading
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}  // Disable input while loading
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}  // Disable input while loading
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Box>
  );
};

export default Register;
