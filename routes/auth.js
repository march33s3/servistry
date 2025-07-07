// File: routes/auth.js - Authentication routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Registry = require('../models/Registry');
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const slugify = require('slugify'); 
const { sendPersonalizedWelcomeEmail } = require('../utils/emailService');


// Setup email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// @route   POST api/auth/register-with-registry
// @desc    Register user and create registry in one step
// @access  Public
router.post('/register-with-registry', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('title').notEmpty().withMessage('Registry title is required'),
  body('description').notEmpty().withMessage('Registry description is required'),
  body('selectedCategory').notEmpty().withMessage('Category is required'),
  body('emotionalResponse').notEmpty().withMessage('Emotional response is required'),
  body('categoryResponse').notEmpty().withMessage('Category response is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName, lastName, email, password,
    title, description, selectedCategory,
    emotionalResponse, categoryResponse,
    emotionalResponseOther, categoryResponseOther
  } = req.body;

  console.log('Register with registry request:', { firstName, lastName, email, title, categoryId: selectedCategory._id });

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      userType: ''
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log('User created:', user._id);

    // Create registry slug
    let urlSlug = slugify(title, { lower: true, strict: true });
    let slugExists = await Registry.findOne({ urlSlug });
    let counter = 1;
    let newSlug = urlSlug;
    while (slugExists) {
      newSlug = `${urlSlug}-${counter}`;
      slugExists = await Registry.findOne({ urlSlug: newSlug });
      counter++;
    }

    // Create registry
    const registry = new Registry({
      user: user._id,
      title,
      description,
      urlSlug: newSlug,
      category: selectedCategory._id,
      emotionalResponse,
      categoryResponse,
      emotionalResponseOther: emotionalResponseOther || null,
      categoryResponseOther: categoryResponseOther || null
    });

    await registry.save();
    console.log('Registry created:', registry._id);

    // Create JWT token
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send welcome email (optional, can be async)
    try {
      const category = await Category.findById(selectedCategory._id);
      await sendPersonalizedWelcomeEmail(user, registry, category);
    } catch (emailError) {
      console.log('Email sending failed, but continuing:', emailError.message);
    }

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      registry: {
        _id: registry._id,
        title: registry.title,
        urlSlug: registry.urlSlug
      }
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      userType: '' // Default empty string
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Account Creation Confirmation',
      text: `Thank you for creating an account with Servistry. You can now create your registry and start adding services.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Create token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// routes/auth.js - Add this new route
router.post('/register-with-registry', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('title').notEmpty().withMessage('Registry title is required'),
  body('description').notEmpty().withMessage('Registry description is required'),
  body('selectedCategory').notEmpty().withMessage('Category is required'),
  body('emotionalResponse').notEmpty().withMessage('Emotional response is required'),
  body('categoryResponse').notEmpty().withMessage('Category response is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName, lastName, email, password,
    title, description, selectedCategory,
    emotionalResponse, categoryResponse,
    emotionalResponseOther, categoryResponseOther
  } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      userType: ''
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create registry
    let urlSlug = slugify(title, { lower: true, strict: true });
    let slugExists = await Registry.findOne({ urlSlug });
    let counter = 1;
    let newSlug = urlSlug;
    while (slugExists) {
      newSlug = `${urlSlug}-${counter}`;
      slugExists = await Registry.findOne({ urlSlug: newSlug });
      counter++;
    }

    const registry = new Registry({
      user: user.id,
      title,
      description,
      urlSlug: newSlug,
      category: selectedCategory._id,
      emotionalResponse,
      categoryResponse,
      emotionalResponseOther,
      categoryResponseOther
    });

    await registry.save();

    // Create JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send welcome email
    await sendPersonalizedWelcomeEmail(user, registry, selectedCategory);

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      registry: {
        _id: registry._id,
        title: registry.title,
        urlSlug: registry.urlSlug
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Please include a valid email')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expire
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) has requested a password reset for your account. Please click on the following link to reset your password: \n\n ${resetUrl} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Email could not be sent' });
      }
      res.status(200).json({ msg: 'Password reset email sent' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/reset-password/:resetToken
// @desc    Reset password
// @access  Public
router.post('/reset-password/:resetToken', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.resetToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;