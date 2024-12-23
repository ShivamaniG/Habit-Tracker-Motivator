import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem } from '@mui/material';

const HabitSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/generate-habit-suggestions') // Update API URL
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching habit suggestions:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        padding: 3,
        boxShadow: 3,
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        AI-Suggestions
      </Typography>
      <List>
        {suggestions.map((habit, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              borderRadius: 1,
              marginBottom: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              transition: 'background-color 0.3s, border-color 0.3s',
              padding: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                {habit.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {habit.description}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HabitSuggestions;
