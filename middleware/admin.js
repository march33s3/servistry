const User = require('../models/User');

module.exports = async function(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    
    // Check if user is admin (using email for simplicity in MVP)
    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
