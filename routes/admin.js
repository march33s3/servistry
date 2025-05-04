const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');
const Registry = require('../models/Registry');
const Service = require('../models/Service');
const Transaction = require('../models/Transaction');

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', [auth, admin], async (req, res) => {
try {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
});

// @route   GET api/admin/registries
// @desc    Get all registries
// @access  Private/Admin
router.get('/registries', [auth, admin], async (req, res) => {
try {
  const registries = await Registry.find().sort({ createdAt: -1 });
  res.json(registries);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
});

// @route   GET api/admin/transactions
// @desc    Get all transactions
// @access  Private/Admin
router.get('/transactions', [auth, admin], async (req, res) => {
try {
  const transactions = await Transaction.find()
    .populate('service', 'title')
    .sort({ createdAt: -1 });
  res.json(transactions);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
});

// @route   GET api/admin/transactions/failed
// @desc    Get all failed transactions
// @access  Private/Admin
router.get('/transactions/failed', [auth, admin], async (req, res) => {
try {
  const transactions = await Transaction.find({ status: 'failed' })
    .populate('service', 'title')
    .sort({ createdAt: -1 });
  res.json(transactions);
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server error');
}
});

module.exports = router;
