import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsLoggedIn(true);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Set logged-in state if token exists
    }
  }, []);

  // Navigate when isLoggedIn becomes true
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = () => {
    navigate('/register'); // Redirect to register page
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
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </Button>
      </form>

      <Box mt={2}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link component="button" variant="body2" onClick={handleRegister}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
