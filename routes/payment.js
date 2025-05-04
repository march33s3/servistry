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

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Create an idempotency key based on service ID, email and amount
    const idempotencyKey = `payment_${serviceId}_${email}_${amount}_${Date.now()}`;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        serviceId,
        email
      }
    }, {
      idempotencyKey
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route   GET api/payment/transactions/:serviceId
// @desc    Get all transactions for a service
// @access  Private
router.get('/transactions/:serviceId', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
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

    const transactions = await Transaction.find({ service: req.params.serviceId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
});


// @route   GET api/payment/test-update/:serviceId/:amount
// @desc    Test endpoint to manually update service funded amount
// @access  Public (for testing only)
router.get('/test-update/:serviceId/:amount', async (req, res) => {
  try {
    const { serviceId, amount } = req.params;
    const service = await Service.findById(serviceId);
    
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }
    
    // Update with explicit type conversion
    const currentAmount = Number(service.fundedAmount);
    service.fundedAmount = currentAmount + Number(amount);
    await service.save();
    
    res.json({ 
      success: true, 
      message: `Service updated. Previous amount: ${currentAmount}, New amount: ${service.fundedAmount}`, 
      service 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export the webhook handler separately to be used in server.js
exports.webhookHandler = async (req, res) => {
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
        const previousAmount = Number(service.fundedAmount);
        service.fundedAmount = previousAmount + Number(amount);
        await service.save();

        console.log(`Service funded amount updated: $${previousAmount} → $${service.fundedAmount}`);

        // Get registry owner email
        const registry = await Registry.findById(service.registry);
        const user = await User.findById(registry.user);

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
};

module.exports = router;