// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Create a new user
router.post('/signup', userController.signup);

// Retrieve all users
router.get('/', userController.getAllUsers);

// Retrieve a single user by ID
router.get('/:userId', userController.getUserById);

// Update a user by ID
router.patch('/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/:userId', userController.deleteUser);

// Login user
router.post('/login', authController.login);

module.exports = router;
