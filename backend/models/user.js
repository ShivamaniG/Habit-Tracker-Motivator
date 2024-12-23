const db = require('../database/connection');

class User {
  static createUser(name, email, password, callback) {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], callback);
  }

  static getUserByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }

  static getUserById(userId, callback) {
    const query = 'SELECT user_id, name, email FROM users WHERE user_id = ?';
    db.query(query, [userId], callback);
}

  static updateUser(userId, name, email, callback) {
    const query = 'UPDATE users SET name = ?, email = ? WHERE user_id = ?';
    db.query(query, [name, email, userId], callback);
  }
}

module.exports = User;
