    const express = require('express');
    const router = express.Router();
    const userController = require('../controllers/userController');

    // Create a new user
    router.post('/', userController.createUser);

    // Get user profile
    router.get('/:userId', userController.getUser);

    router.put('/:userId', userController.updateUser);

    router.post('/login', userController.loginUser);


    module.exports = router;
