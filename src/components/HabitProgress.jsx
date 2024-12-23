import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HabitProgress = ({ 
  progress = 60, 
  previousProgressData = [
    { day: 'Day 1', progress: 55 }, 
    { day: 'Day 2', progress: 70 }
  ] 
}) => {
  const data = previousProgressData.length
    ? previousProgressData
    : [{ day: 'Day 1', progress: 20 }, { day: 'Day 2', progress: 30 }];


  const getBarColor = (progress) => {
    if (progress < 30) return '#FF4C4C'; // Red for low progress
    if (progress < 60) return '#FFB84C'; // Yellow for medium progress
    return '#4CAF50'; // Green for high progress
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
      <Typography variant="h5" gutterBottom sx={{ color: (theme) => theme.palette.text.primary }}>
        Habit Progress
      </Typography>

      {/* Circular Progress Meter */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4} position="relative">
        <CircularProgress
          variant="determinate"
          value={progress}
          color={progress < 30 ? 'error' : progress < 60 ? 'warning' : 'success'}
          size={120}
          thickness={4}
        />
        <Box position="absolute">
          <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.primary }}>
            {progress}%
          </Typography>
        </Box>
      </Box>

      {/* Progress Text */}
      <Typography variant="body2" align="center" mb={4} sx={{ color: (theme) => theme.palette.text.primary }}>
        {progress}% Completed
      </Typography>

      {/* Bar Graph for Previous Days' Progress */}
      <Typography variant="h6" gutterBottom sx={{ color: (theme) => theme.palette.text.primary }}>
        Previous Days' Progress
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="progress"
            barSize={30}
            fill="#8884d8"
            isAnimationActive={false}
            shape={(props) => {
              const { x, y, width, height, value } = props;
              const color = getBarColor(value);
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  stroke="none"
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HabitProgress;
