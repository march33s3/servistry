// routes/registration.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }


    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ 
      firstName,
      lastName, 
      emailAddress, 
      password: hashedPassword,
      userType,
      promotionalOffersAndUpdates, 
    });

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

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  }); 

    // Send success response with user data and token
    res.status(201).json({ message: 'success', data: newUser, token });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;