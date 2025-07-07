const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String, // emoji or font-awesome class
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categorySpecificQuestion: {
    type: String,
    required: true
  },
  questionOptions: [{
    text: String,
    value: String,
    order: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);