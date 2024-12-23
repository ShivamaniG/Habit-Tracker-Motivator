const Habit = require('../models/habit');

exports.createHabit = (req, res) => {
  const { userId, habitTitle, startDate, frequency, status } = req.body;
  Habit.createHabit(userId, habitTitle, startDate, frequency, status, (err, result) => {
    if (err) {
      return res.status(500).send('Error creating habit');
    }
    res.status(201).send({ message: 'Habit created', habitId: result.insertId });
  });
};

exports.getHabits = (req, res) => {
  const userId = req.params.userId;

  Habit.getHabitsByUserId(userId, (err, result) => {
    if (err) {
      console.error('Error fetching habits:', err);
      return res.status(500).send('Error fetching habits');
    }

    // Check if the user has habits
    if (result.length === 0) {
      return res.status(404).send('No habits found for this user');
    }

    res.status(200).send(result);
  });
};

exports.updateHabitStatus = (req, res) => {
  const habitId = req.params.id;
  const { status } = req.body;
  Habit.updateHabitStatus(habitId, status, (err, result) => {
    if (err) {
      return res.status(500).send('Error updating habit status');
    }
    res.status(200).send({ message: 'Habit status updated' });
  });
};

exports.deleteHabit = (req, res) => {
  const habitId = req.params.id;
  Habit.deleteHabit(habitId, (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting habit');
    }
    res.status(200).send({ message: 'Habit deleted' });
  });
};
