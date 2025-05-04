// File: routes/registry.js - Registry routes
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Registry = require('../models/Registry');
const Service = require('../models/Service');
const slugify = require('slugify');
const nodemailer = require('nodemailer');

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// @route   POST api/registry
// @desc    Create a registry
// @access  Private
router.post('/', [
  auth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;

    // Create slug from title
    let urlSlug = slugify(title, {
      lower: true,
      strict: true
    });

    // Check if slug exists
    let slugExists = await Registry.findOne({ urlSlug });
    let counter = 1;
    let newSlug = urlSlug;

    // If slug exists, append number
    while (slugExists) {
      newSlug = `${urlSlug}-${counter}`;
      slugExists = await Registry.findOne({ urlSlug: newSlug });
      counter++;
    }

    const registry = new Registry({
      user: req.user.id,
      title,
      description,
      urlSlug: newSlug
    });

    const savedRegistry = await registry.save();

    // Send confirmation email
    const user = await User.findById(req.user.id);
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Registry Created Successfully',
      text: `Congratulations! Your registry "${title}" has been created successfully. You can share it with others using this link: ${process.env.FRONTEND_URL}/registry/${newSlug}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json(savedRegistry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/registry/user
// @desc    Get all registries for a user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const registries = await Registry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(registries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

  // File: routes/registry.js (continued)

// @route   GET api/registry/:id
// @desc    Get registry by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const registry = await Registry.findById(req.params.id);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    // Check if user owns the registry
    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(registry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Registry not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/registry/public/:slug
// @desc    Get registry by slug (public view)
// @access  Public
router.get('/public/:slug', async (req, res) => {
  try {
    console.log('Public registry request for slug:', req.params.slug);
    
    // First try to find by urlSlug (string)
    let registry = await Registry.findOne({ urlSlug: req.params.slug });
    
    // If not found and the param could be an ID, try by ID
    if (!registry && req.params.slug.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('Slug looks like an ID, trying to find by ID');
      registry = await Registry.findById(req.params.slug);
    }
    
    if (!registry) {
      console.log('Registry not found for slug/id:', req.params.slug);
      return res.status(404).json({ msg: 'Registry not found' });
    }

    console.log('Found registry:', registry.title);

    // Get services for this registry
    const services = await Service.find({ registry: registry._id }).sort({ createdAt: -1 });
    console.log('Found', services.length, 'services');

    res.json({ registry, services });
  } catch (err) {
    console.error('Error in public registry route:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/registry/:id
// @desc    Update registry
// @access  Private
router.put('/:id', [
  auth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;

    let registry = await Registry.findById(req.params.id);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    // Check if user owns the registry
    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    registry.title = title;
    registry.description = description;

    const updatedRegistry = await registry.save();
    res.json(updatedRegistry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Registry not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/registry/:id
// @desc    Delete registry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const registry = await Registry.findById(req.params.id);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    // Check if user owns the registry
    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete all services associated with this registry
    await Service.deleteMany({ registry: registry._id });

    // Delete the registry
    await registry.remove();

    res.json({ msg: 'Registry deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Registry not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;