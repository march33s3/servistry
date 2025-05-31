const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Service = require('../models/Service');
const Transaction = require('../models/Transaction');
const Registry = require('../models/Registry');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const admin = require('../middleware/admin');
const rateLimit = require('express-rate-limit');
const AuditLog = require('../models/AuditLog');

// Create rate limiters (add this after your imports, before your routes)
const adminRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 admin requests per 15 minutes
  message: {
    error: 'Too many admin requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const refundRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 refund attempts per hour
  message: {
    error: 'Too many refund attempts from this IP, please try again later.',
    retryAfter: '1 hour'
  }
});

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// @route   POST api/payment/create-payment-intent
// @desc    Create payment intent
// @access  Public
router.post('/create-payment-intent', [
  body('serviceId').notEmpty().withMessage('Service ID is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { serviceId, amount, email } = req.body;
    
    // Log the incoming request for debugging
    console.log('Creating payment intent:', { serviceId, amount, email });

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error(`Service not found: ${serviceId}`);
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Create an idempotency key based on service ID, email and amount
    const idempotencyKey = `payment_${serviceId}_${email}_${amount}_${Date.now()}`;
    
    // Ensure amount is properly formatted
    const amountInCents = Math.round(parseFloat(amount) * 100);
    
    if (isNaN(amountInCents) || amountInCents <= 0) {
      console.error(`Invalid amount: ${amount}`);
      return res.status(400).json({ msg: 'Invalid amount' });
    }

    // Create payment intent with explicit metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        serviceId: serviceId,
        email: email,
        amount: amount.toString()
      }
    }, {
      idempotencyKey
    });
    
    console.log(`Payment intent created: ${paymentIntent.id} with metadata:`, paymentIntent.metadata);

    res.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (err) {
    console.error('Error creating payment intent:', err.message);
    res.status(500).send('Server error');
  }
});


// @route   GET api/payment/transactions/:serviceId
// @desc    Get all transactions for a service
// @access  Private
router.get('/transactions/:serviceId', [adminRateLimit,auth,admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    const transactions = await Transaction.find({ service: req.params.serviceId }).sort({ createdAt: -1 });
    
    console.log(`Admin ${req.user.id} accessed transactions for service ${req.params.serviceId}`);

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/payment/force-update
// @desc    Manually update service funded amount (for refunds/adjustments)
// @access  Private (authenticated users only)
router.post('/force-update', [
  adminRateLimit,
  auth, // Require authentication
  admin,
  adminRateLimit,
  body('serviceId').notEmpty().withMessage('Service ID is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('reason').optional().isLength({ min: 1, max: 500 }).withMessage('Reason must be 1-500 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { serviceId, amount, reason } = req.body;
    const amountValue = parseFloat(amount);

    // ===== ADD AUDIT LOGGING HERE =====
    // 1. Console logging (immediate)
    console.log(`ADMIN ACTION: User ${req.user.id} updating service ${serviceId} by $${amountValue}. Reason: ${reason || 'No reason provided'}`);
    
    // 2. Get user details for better logging
    const adminUser = await User.findById(req.user.id);
    console.log(`ADMIN DETAILS: ${adminUser.email} (${adminUser.firstName} ${adminUser.lastName})`);
    
    // Find the service
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found' 
      });
    }

    // Check if user owns the service (optional - remove if you want admin-only access)
    const registry = await Registry.findById(service.registry);
    if (!registry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Registry not found' 
      });
    }

    // Verify ownership (comment out these lines if you want any authenticated user to be able to update)
    if (registry.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this service' 
      });
    }

    // Store previous amount for logging
    const previousAmount = parseFloat(service.fundedAmount) || 0;
    
    // Update the funded amount, ensuring it doesn't go below 0
    const newAmount = Math.max(0, previousAmount + amountValue);
    
    // Use MongoDB's updateOne with $set to ensure the update happens
    const updateResult = await Service.updateOne(
      { _id: serviceId },
      { $set: { fundedAmount: newAmount } }
    );
    
    
    if (updateResult.acknowledged && updateResult.modifiedCount > 0) {

      console.log(`SUCCESS: Service ${serviceId} updated from $${previousAmount} to $${newAmount}`);
      console.log(`UPDATE DETAILS: Modified ${updateResult.modifiedCount} document(s)`);
      
      // Get the updated service to return current state
      const updatedService = await Service.findById(serviceId);
      
      const auditLog = new AuditLog({
        adminUser: req.user.id,
        action: 'service_update',
        details: {
          serviceId: serviceId,
          amount: amountValue,
          reason: reason || 'No reason provided',
          previousValue: previousAmount,
          newValue: newAmount
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: true
      });

      await auditLog.save();
      console.log(`AUDIT: Logged action to database with ID ${auditLog._id}`);

      // Optional: Send email notification to registry owner about manual adjustment
      if (Math.abs(amountValue) > 0) {
        try {
          const user = await User.findById(registry.user);
          const adjustmentType = amountValue > 0 ? 'contribution adjustment' : 'refund';
          
          const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: `Service Funding ${amountValue > 0 ? 'Increased' : 'Decreased'}`,
            text: `A manual ${adjustmentType} of $${Math.abs(amountValue).toFixed(2)} has been applied to your service "${service.title}". ${reason ? `Reason: ${reason}` : ''} Your new funded amount is $${updatedService.fundedAmount.toFixed(2)}.`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Failed to send adjustment notification email:', error);
            } else {
              console.log('Adjustment notification email sent:', info.response);
            }
          });
        } catch (emailError) {
          console.error('Error sending notification email:', emailError);
          // Don't fail the request if email fails
        }
      }
      
      return res.json({
        success: true,
        message: `Service funded amount ${amountValue > 0 ? 'increased' : 'decreased'} by $${Math.abs(amountValue).toFixed(2)}`,
        previousAmount: previousAmount,
        newAmount: updatedService.fundedAmount,
        adjustment: amountValue,
        service: updatedService
      });
    } else {
      // ===== FAILURE LOGGING =====
      console.error(`FAILED: Update operation for service ${serviceId} did not modify any document`);
      console.error(`UPDATE RESULT:`, updateResult);

      return res.status(400).json({
        success: false,
        message: 'Update operation did not modify any document',
        updateResult
      });
    }
  } catch (err) {
    // ===== ERROR LOGGING =====
    console.error(`ERROR in force-update: ${err.message}`);
    console.error(`ERROR DETAILS: User ${req.user.id}, Service ${req.body.serviceId}, Amount ${req.body.amount}`);
    console.error(`STACK TRACE:`, err.stack);
    
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// @route   POST api/payment/webhook
// @desc    Stripe webhook
// @access  Public
// Export the webhook handler separately to be used in server.js
router.post('/webhook', async (req, res) => {
  console.log('==== WEBHOOK RECEIVED ====');
  console.log('Headers:', JSON.stringify(req.headers));
  console.log('Body type:', typeof req.body);
  console.log('Body is buffer?', Buffer.isBuffer(req.body));
  console.log('Body length:', req.body?.length || 'unknown');
  
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    // Add this logging
    console.log('Attempting to verify signature with secret:', 
                process.env.STRIPE_WEBHOOK_SECRET ? 
                `${process.env.STRIPE_WEBHOOK_SECRET.substring(0,5)}...` : 
                'NOT SET');
    
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log(`Webhook verified successfully. Event type: ${event.type}`);
  
    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const intentId = paymentIntent.id;
      
      console.log(`Processing successful payment: ${intentId}`);
      console.log('Payment metadata:', JSON.stringify(paymentIntent.metadata));
      
      try {
        // Verify the payment intent directly with Stripe
        const verifiedIntent = await stripe.paymentIntents.retrieve(intentId);
        
        // Only proceed if the status is truly 'succeeded'
        if (verifiedIntent.status !== 'succeeded') {
          console.error(`Payment verification failed: Intent ${intentId} has status ${verifiedIntent.status}`);
          return res.status(400).send('Payment not confirmed');
        }
        
        const serviceId = paymentIntent.metadata.serviceId;
        const email = paymentIntent.metadata.email;
        const amount = paymentIntent.amount / 100; // Convert from cents
        
        if (!serviceId) {
          console.error('Missing serviceId in payment metadata:', paymentIntent.metadata);
          return res.status(400).send('Missing service ID in metadata');
        }
        
        console.log(`Updating service ${serviceId} with contribution amount of $${amount} from ${email}`);
        
        // Update service funded amount
        const service = await Service.findById(serviceId);
        if (!service) {
          console.error(`Service not found: ${serviceId}`);
          return res.status(404).json({ msg: 'Service not found' });
        }

        // Create transaction
        const transaction = new Transaction({
          service: serviceId,
          amount,
          stripePaymentId: paymentIntent.id,
          contributorEmail: email,
          status: 'completed'
        });

        await transaction.save();
        console.log(`Transaction record created: ${transaction._id}`);

        // Update service funded amount - with explicit type conversion
        // CRITICAL FIX: Use parseFloat instead of Number for better precision with decimals
        const previousAmount = parseFloat(service.fundedAmount) || 0;
        service.fundedAmount = previousAmount + parseFloat(amount);
        
        // Check for NaN values before saving
        if (isNaN(service.fundedAmount)) {
          console.error(`Invalid calculation result: previousAmount=${previousAmount}, amount=${amount}`);
          service.fundedAmount = previousAmount + parseFloat(amount);
          console.log(`Retry with explicit conversion: ${service.fundedAmount}`);
          
          // If still NaN, set to a default
          if (isNaN(service.fundedAmount)) {
            console.error('Still got NaN after retry, using amount as default');
            service.fundedAmount = parseFloat(amount);
          }
        }
        
        console.log(`About to save service with funded amount updated: $${previousAmount} → $${service.fundedAmount}`);
        await service.save();
        console.log(`Service funded amount updated successfully to $${service.fundedAmount}`);

        // Get registry owner email
        const registry = await Registry.findById(service.registry);
        if (!registry) {
          console.error(`Registry not found for service: ${service.registry}`);
          return res.status(200).send('Webhook received, but registry not found');
        }
        
        const user = await User.findById(registry.user);
        if (!user) {
          console.error(`User not found for registry: ${registry.user}`);
          return res.status(200).send('Webhook received, but user not found');
        }

        // Send email to registry owner
        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: 'New Contribution Received',
          text: `You have received a contribution of $${amount} for your service "${service.title}" in registry "${registry.title}".`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(`Error sending email to registry owner: ${error}`);
          } else {
            console.log(`Email sent to registry owner: ${info.response}`);
          }
        });

        // Send confirmation email to contributor
        const contributorMailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Thank You for Your Contribution',
          text: `Thank you for your contribution of $${amount} to "${service.title}" in the registry "${registry.title}".`
        };

        transporter.sendMail(contributorMailOptions, (error, info) => {
          if (error) {
            console.log(`Error sending email to contributor: ${error}`);
          } else {
            console.log(`Email sent to contributor: ${info.response}`);
          }
        });
        
        console.log('Webhook processing completed successfully');
      } catch (err) {
        console.error(`Error processing payment success: ${err.message}`);
        console.error(err.stack);
        return res.status(500).send('Server error processing payment');
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const { error } = paymentIntent.last_payment_error || {};

      // Enhanced logging
      console.error('Payment failed:', {
        intentId: paymentIntent.id,
        errorType: error?.type,
        errorCode: error?.code,
        errorMessage: error?.message,
        serviceId: paymentIntent.metadata.serviceId,
        email: paymentIntent.metadata.email,
        amount: paymentIntent.amount / 100
      });  

      // Log failed payment
      const serviceId = paymentIntent.metadata.serviceId;
      const email = paymentIntent.metadata.email;
      const amount = paymentIntent.amount / 100; // Convert from cents

      try {
        // Create transaction with failed status
        const transaction = new Transaction({
          service: serviceId,
          amount,
          stripePaymentId: paymentIntent.id,
          contributorEmail: email,
          status: 'failed',
          errorDetails: error ? JSON.stringify(error) : 'Unknown error'
        });

        await transaction.save();
        console.log(`Failed transaction record created: ${transaction._id}`);

        try {
          const contributorMailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Payment Processing Issue',
            text: `There was an issue processing your payment of $${amount} for the service. Please try again or contact support if the issue persists.`
          };

          transporter.sendMail(contributorMailOptions);
          console.log(`Payment failure email sent to ${email}`);
        
        } catch (emailErr) {
          console.error('Failed to send payment failure email:', emailErr);
        }  
      } catch (err) {
        console.error('Failed to save failed transaction:', err.message);
      }
    }
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Always return a 200 to acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
});

module.exports = router;