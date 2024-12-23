const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// Create a new habit
router.post('/', habitController.createHabit);

// Get habits for a specific user
router.get('/:userId', habitController.getHabits);

// Update habit status
router.put('/:id', habitController.updateHabitStatus);

// Delete habit
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
