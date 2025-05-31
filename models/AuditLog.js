const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['service_update', 'refund', 'user_update', 'registry_delete']
  },
  details: {
    serviceId: String,
    amount: Number,
    reason: String,
    previousValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: String
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);