const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  registry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registry',
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
  link: {
    type: String,
    required: true
  },
  requestedAmount: {
    type: Number,
    required: true,
    min: 0
  },
  fundedAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
