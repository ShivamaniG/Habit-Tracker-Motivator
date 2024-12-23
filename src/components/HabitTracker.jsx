import React, { useState } from 'react';
import HabitList from './HabitList';
import HabitProgress from './HabitProgress';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [progress, setProgress] = useState(0);

  const updateHabits = (newHabits) => {
    setHabits(newHabits);
    const completed = newHabits.filter((habit) => habit.done).length;
    const total = newHabits.length;
    setProgress(total > 0 ? (completed / total) * 100 : 0);
  };

  return (
    <div>
      <HabitList habits={habits} setHabits={updateHabits} />
      <HabitProgress progress={progress} />
    </div>
  );
};

export default HabitTracker;
