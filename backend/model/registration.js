// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  feeling: {
    type: String,
    required: false,
    trim: true,
  },
  eventName: {
    type: String,
    required: false,
    trim: true,
  },
  // Any other registration-specific fields...
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
