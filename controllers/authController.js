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

      if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare password
      console.log('Provided password:', password);
      console.log('Stored password:', user.password);
      const isPasswordMatch = password === user.password;
      console.log('Password match:', isPasswordMatch);

      if (!isPasswordMatch) {
          console.log('Invalid password');
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Set session with user's ObjectId
      req.session.userId = user._id;

      // Log the userId
      console.log('User ID in session:', req.session.userId);

      // Login successful
      console.log('Login successful');

      // Send back user data along with login message
      res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
