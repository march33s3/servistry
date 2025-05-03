/**
 * Utility functions for Stripe payment processing
 */

import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
export const getStripe = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  return stripePromise;
};

// Format amount in cents (Stripe requires amounts in cents)
export const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

// Format amount for display (from cents to dollars)
export const formatAmountFromStripe = (amount) => {
  return (amount / 100).toFixed(2);
};

// Card element options for consistent styling
export const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      ':-webkit-autofill': {
        color: '#424770',
      },
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146',
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  },
};

// Validate a payment form
export const validatePaymentForm = (amount, email) => {
  const errors = {};
  
  if (!amount || amount <= 0) {
    errors.amount = 'Please enter a valid amount greater than 0';
  }
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Handle payment error responses
export const handlePaymentError = (error) => {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  
  if (error.type === 'card_error' || error.type === 'validation_error') {
    errorMessage = error.message;
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  return errorMessage;
};

// Test cards for development
export const TEST_CARDS = {
  success: '4242 4242 4242 4242',
  decline: '4000 0000 0000 0002',
  insufficient: '4000 0000 0000 9995',
  incorrectCvc: '4000 0000 0000 0127',
  expiredCard: '4000 0000 0000 0069',
  processingError: '4000 0000 0000 0119'
};