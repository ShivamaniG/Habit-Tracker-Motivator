const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Prefix routes for API endpoints
app.use('/api/habits', habitRoutes);  // Prefix habit routes
app.use('/api/users', userRoutes);    // Prefix user routes

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
