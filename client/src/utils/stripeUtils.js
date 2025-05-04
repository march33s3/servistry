// stripeUtils.js - Create this file in your utils folder
import { loadStripe } from '@stripe/stripe-js';

// Create a singleton instance of the Stripe object
let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

// Validate payment form
export const validatePaymentForm = (amount, email) => {
  let errors = {};
  
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    errors.amount = 'Please enter a valid amount greater than 0';
  }
  
  if (!email || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate email format
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Get human-readable message for Stripe error
export const getReadableErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  
  // Handle specific error types first
  if (error.type === 'card_error') {
    switch (error.code) {
      case 'card_declined':
        return 'Your card was declined. Please try another payment method.';
      case 'expired_card':
        return 'Your card has expired. Please try another card.';
      case 'incorrect_cvc':
        return 'The security code (CVC) is incorrect. Please check and try again.';
      case 'insufficient_funds':
        return 'Your card has insufficient funds. Please try another card.';
      case 'invalid_expiry_year':
      case 'invalid_expiry_month':
        return 'The expiration date is invalid. Please check and try again.';
      case 'invalid_number':
        return 'The card number is invalid. Please check and try again.';
      default:
        return error.message || 'Your card was declined. Please try again.';
    }
  }
  
  // For other error types, just use the message if available
  return error.message || 'An error occurred during payment processing. Please try again.';
};

// Handle Stripe payment intent status
export const getPaymentStatusMessage = (status) => {
  switch (status) {
    case 'requires_payment_method':
      return 'Please provide your payment details.';
    case 'requires_confirmation':
      return 'Confirming your payment...';
    case 'requires_action':
      return 'Additional authentication required. Please follow the instructions.';
    case 'processing':
      return 'Your payment is processing...';
    case 'requires_capture':
      return 'Payment authorized, completing the transaction...';
    case 'succeeded':
      return 'Payment successful! Thank you for your contribution.';
    case 'canceled':
      return 'The payment was canceled.';
    default:
      return `Payment status: ${status}`;
  }
};

// Get payment intent status class
export const getStatusClass = (status) => {
  if (status === 'succeeded') return 'success';
  if (status === 'canceled' || status.includes('error') || status.includes('failed')) return 'error';
  return '';
};