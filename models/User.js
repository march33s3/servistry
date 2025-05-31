// File: models/User.js - User model
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: '',
    enum: ['', 'admin', 'user', 'premium'] // Add types as needed
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
},
{
  timestamps: true // This automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', UserSchema);