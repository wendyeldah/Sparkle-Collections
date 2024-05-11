// authController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
  
      console.log('Received login request:', { emailOrUsername, password });
  
      // Find user by email or username
      const user = await User.findOne({
        $or: [
          { email: emailOrUsername },
          { phone: emailOrUsername }
        ]
      });
  
      console.log('User found:', user);
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare password
      console.log('Provided password:', password);
      console.log('Stored password:', user.password);
      const isPasswordMatch = password === user.password;
      console.log('Password match:', isPasswordMatch);
      console.log('Password match (simple comparison):', isPasswordMatch);
      
      if (!isPasswordMatch) {
        console.log('Invalid password');
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Set session with user's ObjectId
      req.session.userId = user._id;
  
      // Login successful
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.isLoggedIn = (req, res, next) => {
    try {
      // Check if user ID is stored in the session
      if (req.session.userId) {
        // If user ID is stored, move to the next middleware/route handler
        return next();
      } else {
        // If user is not logged in, return 401 Unauthorized status
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      // If an error occurs, return 500 Internal Server Error status
      console.error('Error checking if user is logged in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  