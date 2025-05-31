const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Registry = require('../models/Registry');
const Service = require('../models/Service');


// @route   POST api/service
// @desc    Create a service
// @access  Private
router.post('/', [
  auth,
  body('registry').notEmpty().withMessage('Registry ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('link').notEmpty().withMessage('Link is required'),
  body('requestedAmount').isNumeric().withMessage('Requested amount must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { registry: registryId, title, description, link, requestedAmount } = req.body;

    // Check if registry exists and belongs to user
    const registry = await Registry.findById(registryId);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const service = new Service({
      registry: registryId,
      title,
      description,
      link,
      requestedAmount
    });

    const savedService = await service.save();
    res.json(savedService);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/service/registry/:registryId
// @desc    Get all services for a registry
// @access  Private
router.get('/registry/:registryId', auth, async (req, res) => {
  try {
    const registry = await Registry.findById(req.params.registryId);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    // Check if user owns the registry
    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const services = await Service.find({ registry: req.params.registryId }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Registry not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/service/public/:id
// @desc    Get service by ID (public access for contribution)
// @access  Public
router.get('/public/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/service/:id
// @desc    Get service by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Check if user owns the registry
    const registry = await Registry.findById(service.registry);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/service/details/:id
// @desc    Get service details with registry info
// @access  Public
router.get('/details/:id', async (req, res) => {
  try {
    // Find the service
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Find the registry
    const registry = await Registry.findById(service.registry);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    // Return both service and registry info
    res.json({
      service,
      registry: {
        _id: registry._id,
        title: registry.title,
        description: registry.description,
        urlSlug: registry.urlSlug
      }
    });
  } catch (err) {
    console.error('Error fetching service details:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/service/:id
// @desc    Update service
// @access  Private
router.put('/:id', [
  auth,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('link').notEmpty().withMessage('Link is required'),
  body('requestedAmount').isNumeric().withMessage('Requested amount must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, link, requestedAmount } = req.body;

    let service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Check if user owns the registry
    const registry = await Registry.findById(service.registry);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    service.title = title;
    service.description = description;
    service.link = link;
    service.requestedAmount = requestedAmount;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/service/:id
// @desc    Delete service
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Check if user owns the registry
    const registry = await Registry.findById(service.registry);
    
    if (!registry) {
      return res.status(404).json({ msg: 'Registry not found' });
    }

    if (registry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await service.remove();

    res.json({ msg: 'Service deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;