const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// @route   GET api/category
// @desc    Get all active categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/category/:slug
// @desc    Get category by slug with questions
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;