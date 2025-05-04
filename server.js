// File: server.js - Main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.post('/api/payment/webhook', express.raw({type: 'application/json'}), (req, res) => {
  require('./routes/payment').webhookHandler(req, res);
});

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.get('/api/test-webhook', (req, res) => {
  console.log('Test endpoint hit');
  res.status(200).send('Webhook endpoint is reachable');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/registry', require('./routes/registry'));
app.use('/api/service', require('./routes/service'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server error', error: err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));