const mongoose = require('mongoose');

const RegistrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  urlSlug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  emotionalResponse: {
    type: String,
    required: true
  },
  categoryResponse: {
    type: String,
    required: true
  },
  emotionalResponseOther: {
    type: String, // for "Other" responses
    default: null
  },
  categoryResponseOther: {
    type: String, // for "Other" responses
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registry', RegistrySchema);
