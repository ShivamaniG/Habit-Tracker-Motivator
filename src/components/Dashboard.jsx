import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, AppBar, Toolbar, IconButton, Switch, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import HabitList from './HabitList';
import HabitProgress from './HabitProgress';
import HabitSuggestions from './HabitSuggestions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Person from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation in v6
import axios from 'axios';

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [userName, setUserName] = useState(''); // Initially empty, will be set after fetching
    const navigate = useNavigate(); // useNavigate hook for navigation

    const [userId] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:5000/api/users/${userId}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('Fetched user data:', response.data);
                        setUserName(response.data.name);
                    } else {
                        console.error('Failed to fetch user data');
                        setUserName('Error fetching user');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                    setUserName('Error fetching user');
                });
        }
    }, [userId]);

    // Toggle between light and dark modes
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#121212' : '#f5f5f5', // Customize background color for light/dark mode
            },
            text: {
                primary: darkMode ? '#ffffff' : '#000000', // Adjust text color for light/dark mode
            },
        },
        typography: {
            fontFamily: 'Montserrat, Arial, sans-serif', // Set Montserrat as the default font
            h6: {
                fontSize: '1.5rem', // Adjust the size for h6 headings
            },
            body1: {
                fontSize: '1rem', // Body text size
            },
        },
    });

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId'); // Optionally clear userId
        console.log('Logged out');
        navigate('/');
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleProfileRedirect = () => {
        // Redirect to the profile page using useNavigate
        navigate('/profile');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
                {/* Navbar */}
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
                            Habit Tracker | Dashboard
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Username and Profile Button */}
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary, marginRight: 2 }}>
                                {userName ? userName : 'Loading...'}
                            </Typography>
                            <Button color="inherit" onClick={handleProfileRedirect} startIcon={<Person />}>
                                Profile
                            </Button>
                            {/* Theme Switcher */}
                            <Switch checked={darkMode} onChange={handleThemeChange} />

                            {/* Logout Button */}
                            <IconButton edge="end" color="inherit" onClick={handleLogout}>
                                <Logout />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Dashboard Content */}
                <Box p={4}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <HabitProgress />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <HabitList />
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <HabitSuggestions />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;
