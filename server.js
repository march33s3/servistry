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

app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://theservistry.com',
    'https://servistry.vercel.app',
    'https://bookish-space-xylophone-576qw65g6qv27qx5-3000.app.github.dev',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))

  // Auto-seed categories on startup
  await autoSeedCategories();
})
.catch(err => console.error('MongoDB connection error:', err));

// Auto-seeding function
async function autoSeedCategories() {
  try {
    const Category = require('./models/Category');
    
    // Check if categories already exist
    const existingCategories = await Category.countDocuments();
    
    if (existingCategories === 0) {
      console.log('🌱 No categories found, auto-seeding...');
      
      // Import and run the seeding function
      const { seedCategories } = require('./scripts/seedCategories');
      await seedCategories();
      
      console.log('✅ Auto-seeding completed successfully');
    } else {
      console.log(`📊 Found ${existingCategories} existing categories, skipping auto-seed`);
    }
  } catch (error) {
    console.error('❌ Auto-seeding failed:', error.message);
    
    // Don't crash the server if seeding fails
    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 Production auto-seed failed - server continuing anyway');
    } else {
      console.error('🛠️ Development auto-seed failed - check your database connection');
    }
  }
}


app.get('/api/test-webhook', (req, res) => {
  console.log('Test endpoint hit');
  res.status(200).send('Webhook endpoint is reachable');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
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
