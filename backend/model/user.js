// models/User.js

const mongoose = require('mongoose');

// Define the user schema with validation and constraints
const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  promotionalOffersAndUpdates: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: false,
  },
  feeling: {
    type: String,
    required: false,
  },
  eventName: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  zipCode: {
    type: String,
    required: false,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  state: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;