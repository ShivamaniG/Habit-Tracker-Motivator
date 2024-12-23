import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios'; // Ensure axios is imported

const Profile = () => {
  const [name, setName] = useState(''); // Initially empty, will be set after fetching
  const [email, setEmail] = useState(''); // To hold email value
  const [password, setPassword] = useState('');
  const [previousName, setPreviousName] = useState(''); // For storing previous name
  const [updateSuccess, setUpdateSuccess] = useState(false); // New state to track update success
  const progress = 75; // Example progress percentage (read-only)

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((response) => {
          console.log('Fetched user data:', response.data);
          setPreviousName(response.data.name);
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [updateSuccess]); // Dependency array updated to include `updateSuccess`

  // Handle name and email change
  const handleNameChange = () => {
    const userId = localStorage.getItem('userId');
    if (userId && name && email) {
      axios
        .put(`http://localhost:5000/api/users/${userId}`, { name, email })
        .then((response) => {
          if (response.status === 200) {
            console.log('User updated:', response.data);
            setUpdateSuccess(true); // Mark update as successful
          }
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      console.log('Name or email is missing!');
    }
  };


  const handlePasswordChange = () => {
    // Logic to update the user's password
    console.log('Password updated:', password);
    setPassword(''); // Clear password field after update
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Profile Details</Typography>
        
        {/* Display previous name */}
        <Typography variant="body1">Previous Name: {previousName}</Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleNameChange}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          Save Changes
        </Button>
        
        <TextField
          label="Change Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePasswordChange}
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.dark,
            },
          }}
        >
          Update Password
        </Button>
      </Paper>
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          marginTop: 3,
        }}
      >
        <Typography variant="h6">Total Progress</Typography>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: 'bold', marginTop: 1 }}
        >
          {progress}% {/* Read-only display */}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
