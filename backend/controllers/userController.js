const User = require('../models/user');
const db = require('../database/connection');
const jwt = require('jsonwebtoken'); // Optional: to issue a JWT token after login

// Create a new user
exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  if (!name || !email || !password) {
    const message = 'Missing required fields: name, email, or password';
    console.error(message); 
    return res.status(400).send({ message }); 
  }

  console.log('Creating user with:', { email, name });

  User.createUser(name, email, password, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);  // Log the error details
      return res.status(500).send({ message: 'Error creating user', error: err.message });
    }

    console.log('User created with ID:', result.insertId);  // Log the new user ID
    res.status(201).send({ message: 'User created successfully', userId: result.insertId });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    if (user.password === password) {
      // You can later add JWT for authentication
      const token = jwt.sign({ userId: user.user_id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
      return res.status(200).json({
        message: 'Login successful',
        token: token, // Send the token back to the user
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
};

// Get user by ID
exports.getUser = (req, res) => {
  const userId = req.params.userId;
  console.log('Fetching user with ID:', userId);

  User.getUserById(userId, (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send({ message: 'Error fetching user', error: err.message });
    }
    if (result.length === 0) {
      const message = 'User not found';
      console.warn(message);
      return res.status(404).send({ message });
    }
    
    // Assuming the result is an array of user objects, take the first user
    const userData = result[0];

    // Ensure the returned object has the necessary fields
    res.status(200).send({
      name: userData.name,
      email: userData.email
    });
  });
};


// Update user by ID
exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  // Validate if both name and email are provided
  if (!name || !email) {
    const message = 'Missing required fields: name or email';
    console.error(message);
    return res.status(400).send({ message }); // 400 Bad Request
  }

  // Validate email format (basic validation)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    const message = 'Invalid email format';
    console.error(message);
    return res.status(400).send({ message }); // 400 Bad Request
  }

  console.log('Updating user with ID:', userId, { name, email });

  // Assuming `User.updateUser` handles the database update
  User.updateUser(userId, name, email, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send({ message: 'Error updating user', error: err.message });
    }
    
    console.log('Database result:', result);
    if (result.affectedRows === 0) {
      const message = 'User not found or no changes made';
      console.warn(message);
      return res.status(404).send({ message });
    }
  
    res.status(200).send({ message: 'User updated successfully' });
  });
};
