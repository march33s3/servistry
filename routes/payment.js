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

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        serviceId,
        email
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/payment/webhook
// @desc    Stripe webhook
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Update service funded amount
    const serviceId = paymentIntent.metadata.serviceId;
    const email = paymentIntent.metadata.email;
    const amount = paymentIntent.amount / 100; // Convert from cents

    try {
      const service = await Service.findById(serviceId);
      if (!service) {
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

      // Update service funded amount
      service.fundedAmount += amount;
      await service.save();

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
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
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
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  } else if (event.type === 'payment_intent.payment_failed') {
  const paymentIntent = event.data.object;
  
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
      status: 'failed'
    });

    await transaction.save();
  } catch (err) {
    console.error(err.message);
  }
}

res.send();
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

module.exports = router;