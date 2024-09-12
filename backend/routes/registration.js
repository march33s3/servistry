// routes/registration.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/user'); // Import the User model
const Registration = require('../model/registration'); // Import the Registration model

const router = express.Router();

// POST route to add a new user through registration
router.post('/register', async (req, res) => {
  const { 
    firstName, 
    lastName, 
    emailAddress, 
    password, 
    feeling, 
    eventName, 
    userType, 
    promotionalOffersAndUpdates 
  } = req.body;

  // Backend validation
  if (!firstName || !lastName || !emailAddress || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ emailAddress });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
          // Create a new user
        user = new User({ 
        firstName,
        lastName, 
        emailAddress, 
        password,
        userType,
        promotionalOffersAndUpdates, 
      });

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user in the database
      await user.save();

    // Create a registration entry with registration-specific fields
    const registration = new Registration({
      userId: user._id, // Reference to the newly created user
      feeling,
      eventName,
    });

    // Save registration data
    await registration.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;