// routes/registration.js
const express = require('express');
const router = express.Router();
const Registration = require('../model/registration');

// POST route to add a new user through registration
router.post('/add', async (req, res) => {
    const { firstandLastName, emailAddress, password, feeling, userType, eventID, promotionalOffersAndUpdates } = req.body;
    try {
      const newRegistration = new Registration({ 
        firstandLastName, 
        emailAddress, 
        password, 
        feeling, 
        userType, 
        eventID, 
        promotionalOffersAndUpdates, 
      });
      await newRegistration.save();

      res.status(201).json({ message: 'success', data: newRegistration });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;