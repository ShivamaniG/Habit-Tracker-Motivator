import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText,LinearProgress, IconButton, Button, Dialog, TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
// import HabitProgress from './HabitProgress';


const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [open, setOpen] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [habitFrequency, setHabitFrequency] = useState('Daily');
  const [habitStatus, setHabitStatus] = useState({});
  const [progress, setProgress] = useState(0);

  const userId = 1;

  useEffect(() => {
    axios
      .get(`/api/habits/${userId}`)
      .then((response) => {
        console.log(response); // Log the response to inspect it
        setHabits(response.data);
        const status = {};
        response.data.forEach((habit) => {
          status[habit.id] = false; // Set initial status as false
        });
        setHabitStatus(status);
      })
      .catch((error) => {
        console.error('Error fetching habits:', error);
      });
  }, [userId]);

  const handleAddHabit = () => {
    setHabits([...habits, { id: Date.now(), title: newHabit, frequency: habitFrequency }]);
    setNewHabit('');
    setHabitFrequency('Daily');
    setOpen(false);
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    const newStatus = { ...habitStatus };
    delete newStatus[id];
    setHabitStatus(newStatus);
  };

  const handleEditHabit = (id) => {
    const updatedHabit = prompt('Edit habit title:', habits.find(habit => habit.id === id).title);
    const updatedFrequency = prompt('Edit habit frequency:', habits.find(habit => habit.id === id).frequency);
    if (updatedHabit && updatedFrequency) {
      setHabits(habits.map(habit => habit.id === id ? { ...habit, title: updatedHabit, frequency: updatedFrequency } : habit));
    }
  };

  const handleToggleStatus = (id) => {
    const updatedStatus = {
      ...habitStatus,
      [id]: !habitStatus[id],
    };
    setHabitStatus(updatedStatus);
  
    // Calculate progress based on completed habits
    const completedHabits = Object.values(updatedStatus).filter((status) => status).length;
    const progressPercentage = (completedHabits / habits.length) * 100;
  
    setProgress(progressPercentage);
  };
  

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
  <Typography variant="h5" gutterBottom sx={{ color: (theme) => theme.palette.text.primary }}>
    Your Habits
  </Typography>
  <Button
    variant="contained"
    onClick={() => setOpen(true)}
    sx={{
      backgroundColor: (theme) => theme.palette.primary.main,
      color: (theme) => theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: (theme) => theme.palette.primary.dark,
      },
    }}
  >
    Add Habit
  </Button>
</Box>

<LinearProgress
  variant="determinate"
  value={progress}
  sx={{ marginBottom: 2, height: 10, borderRadius: 5 }}
/>
<Typography>{`Progress: ${progress.toFixed(0)}%`}</Typography>
      <List>
        {habits.map((habit) => (
          <ListItem
            key={habit.id}
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              borderRadius: 1,
              marginBottom: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton edge="end" onClick={() => handleDeleteHabit(habit.id)}>
                  <Delete />
                </IconButton>
                <IconButton edge="end" onClick={() => handleEditHabit(habit.id)}>
                  <Edit />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={habit.title}
              secondary={`Frequency: ${habit.frequency}`}
              sx={{ color: (theme) => theme.palette.text.primary }}
            />
            {/* Checkbox for tracking habit status */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={habitStatus[habit.id] || false}
                  onChange={() => handleToggleStatus(habit.id)}
                  sx={{
                    color: habitStatus[habit.id]
                      ? (theme) => theme.palette.success.main
                      : (theme) => theme.palette.error.main,
                    '&.Mui-checked': {
                      color: (theme) => theme.palette.success.main,
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: habitStatus[habit.id]
                      ? (theme) => theme.palette.success.main
                      : (theme) => theme.palette.text.primary,
                  }}
                >
                  {habitStatus[habit.id] ? 'Done' : 'Not Done'}
                </Typography>
              }
              sx={{ marginRight: 5 }}
            />

          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={3} display="flex" flexDirection="column" gap={2}>
          <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
            Add New Habit
          </Typography>
          <TextField
            label="Habit"
            fullWidth
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              color: (theme) => theme.palette.text.primary,
              '& .MuiInputBase-root': {
                color: (theme) => theme.palette.text.primary,
              },
            }}
          />
          {/* Frequency Selection */}
          <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select
              value={habitFrequency}
              onChange={(e) => setHabitFrequency(e.target.value)}
              label="Frequency"
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleAddHabit}
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Add
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default HabitList;
