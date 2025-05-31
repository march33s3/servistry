const User = require('../models/User');

module.exports = async function(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    
    // Check if user is admin
    if (user.userType !== 'admin') {
      console.log(`Unauthorized admin access attempt by user: ${user.email}`);
      return res.status(403).json({ msg: 'Access denied - Admin privileges required' });
    }
    
    // Add user to request for use in routes
    req.adminUser = user;
    next();
  } catch (err) {
    console.error('Admin middleware error:', err.message);
    res.status(500).send('Server error');
  }
};
