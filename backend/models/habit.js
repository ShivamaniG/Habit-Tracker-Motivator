const db = require('../database/connection');

class Habit {
  static createHabit(userId, habitTitle, startDate, frequency, status, callback) {
    const query = 'INSERT INTO habits (user_id, habit_title, start_date, frequency, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [userId, habitTitle, startDate, frequency, status], callback);
  }

  static getHabitsByUserId(userId, callback) {
    const query = 'SELECT * FROM habits WHERE user_id = ?';
    db.query(query, [userId], callback);
  }

  static updateHabitStatus(habitId, status, callback) {
    const query = 'UPDATE habits SET status = ? WHERE habit_id = ?';
    db.query(query, [status, habitId], callback);
  }

  static deleteHabit(habitId, callback) {
    const query = 'DELETE FROM habits WHERE habit_id = ?';
    db.query(query, [habitId], callback);
  }
}

module.exports = Habit;
