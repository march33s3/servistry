import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../context/service/ServiceState';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import TestCards from './TestCards';
import axios from '../../config/api';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Utility functions for Stripe integration
const validatePaymentForm = (amount, email) => {
  let errors = {};
  
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    errors.amount = 'Please enter a valid amount greater than 0';
  }
  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const getReadableErrorMessage = (error) => {
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

const getPaymentStatusMessage = (status) => {
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

const getStatusClass = (status) => {
  if (status === 'succeeded') return 'success';
  if (status === 'canceled' || status.includes('error') || status.includes('failed')) return 'error';
  return '';
};

// Payment Form Component
const PaymentForm = ({ service, registrySlug, onPaymentSuccess }) => {
  const { createPaymentIntent } = useContext(ServiceContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [processingStatus, setProcessingStatus] = useState(''); 
  const [paymentIntentStatus, setPaymentIntentStatus] = useState('');
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (formErrors.amount) {
      setFormErrors({...formErrors, amount: null});
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formErrors.email) {
      setFormErrors({...formErrors, email: null});
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      toast.error('Stripe has not loaded. Please refresh the page and try again.');
      return;
    }

      // Prevent double submission
    if (loading) {
      console.log('Payment already in progress, ignoring duplicate submission');
      return;
    }
  
    // Validate form data
    const validation = validatePaymentForm(amount, email);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
  
    setLoading(true);
    setCardError(null);
    setProcessingStatus('Initiating payment...');
  
    try {
      // Create payment intent on the server
      setProcessingStatus('Creating payment request...');
      const paymentAmount = parseFloat(amount);
      
      console.log(`Creating payment intent for service ${service._id} with amount ${paymentAmount}`);
      
      const paymentIntentResponse = await createPaymentIntent(
        service._id,
        paymentAmount,
        email
      );
  
      if (!paymentIntentResponse) {
        setLoading(false);
        setProcessingStatus('Payment setup failed.');
        toast.error('Failed to set up payment. Please try again.');
        return;
      }
  
      // Confirm the payment with Stripe
      setProcessingStatus('Processing your card...');
      const result = await stripe.confirmCardPayment(paymentIntentResponse.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
            name: name || undefined
          }
        }
      });
  
      if (result.error) {
        setCardError(getReadableErrorMessage(result.error));
        setProcessingStatus('Payment failed');
        setPaymentIntentStatus('failed');
      } else {
        const status = result.paymentIntent.status;
        setPaymentIntentStatus(status);
        setProcessingStatus(getPaymentStatusMessage(status));
        
        if (status === 'succeeded') {
          setIsProcessingComplete(true);
          toast.success('Payment successful! Thank you for your contribution.');
          
          // Update the service object locally to show updated funded amount immediately
          try {
            // Create a copy of the service with updated fundedAmount
            const updatedService = {
              ...service,
              fundedAmount: parseFloat(service.fundedAmount) + paymentAmount
            };
            
            console.log(`UI update: Funded amount changed from ${service.fundedAmount} to ${updatedService.fundedAmount}`);
            
            // Call the callback to update parent component
            if (typeof onPaymentSuccess === 'function') {
              onPaymentSuccess(updatedService);
            }
            
          } catch (uiErr) {
            console.warn('Could not update UI with new funded amount:', uiErr);
          }// This is fine - the webhook will handle the real update
          
          // Add a short delay to show the success message before redirecting
          setTimeout(() => {
            if (registrySlug) {
              navigate(`/registry/${registrySlug}`);
            } else {
              console.error('No registry slug available for redirection');
              toast.warning('Registry information not available. Redirecting to home page.');
              navigate('/');
            }
          }, 3000);
        } else if (status === 'requires_action') {
          setProcessingStatus('Additional authentication required. Please complete the verification.');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setProcessingStatus('Payment processing error');
      setPaymentIntentStatus('error');
      toast.error('There was an error processing your payment. Please try again.');
    }
  
    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4'
        },
        ':-webkit-autofill': {
          color: '#424770'
        }
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146',
        '::placeholder': {
          color: '#FFCCA5'
        }
      }
    },
    hidePostalCode: true
  };

  // Calculate amount left to fund
  const amountLeftToFund = Math.max(0, service.requestedAmount - service.fundedAmount);
  const statusClass = getStatusClass(paymentIntentStatus);

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label htmlFor="amount">Contribution Amount ($)</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          min="1"
          max={amountLeftToFund}
          step="0.01"
          required
          placeholder={`Up to $${amountLeftToFund.toFixed(2)} remaining`}
          className={formErrors.amount ? 'error' : ''}
          disabled={loading || isProcessingComplete}
        />
        {formErrors.amount && <div className="form-error">{formErrors.amount}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="Your email for receipt"
          className={formErrors.email ? 'error' : ''}
          disabled={loading || isProcessingComplete}
        />
        {formErrors.email && <div className="form-error">{formErrors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="name">Name (Optional)</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name on card"
          disabled={loading || isProcessingComplete}
        />
      </div>

      <div className="form-group">
        <label>Card Details</label>
        <div className="card-element-container">
          <CardElement 
            options={cardElementOptions}
            onChange={handleCardChange}
            disabled={loading || isProcessingComplete} 
          />
        </div>
        {cardError && <div className="card-error">{cardError}</div>}
      </div>

      {/* Add status indicator */}
      {processingStatus && (
        <div className={`payment-status ${statusClass}`}>
          <p>{processingStatus}</p>
          {loading && <div className="processing-spinner"></div>}
        </div>
      )}
      
      {/* Payment Button */}
      <button
        type="submit"
        disabled={!stripe || loading || isProcessingComplete}
        className={`btn btn-primary btn-block ${loading ? 'btn-loading' : ''}`}
      >
        {loading ? 'Processing...' : isProcessingComplete ? 'Payment Complete!' : `Make Contribution${amount ? ` ($${parseFloat(amount).toFixed(2)})` : ''}`}
      </button>
      
      {/* Warning during processing */}
      {loading && (
        <div className="payment-processing-warning">
          <p><i className="fas fa-exclamation-circle"></i> Please do not close your browser window during payment processing</p>
        </div>
      )}
      
      {/* Display test cards in development mode */}
      <TestCards />
      
      <div className="secure-payment-info">
        <i className="fas fa-lock"></i> All payments are secure and encrypted
      </div>
    </form>
  );
};

// Main Contribution Component
const Contribution = () => {
  const { getPublicService, service: initialService, loading: serviceLoading, error, clearErrors } = useContext(ServiceContext);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  // State for service data that can be updated after payment
  const [service, setService] = useState(null);
  const [registrySlug, setRegistrySlug] = useState(null);
  const [loadingRegistry, setLoadingRegistry] = useState(false);
  const [registryError, setRegistryError] = useState(null);

  // Update local service state when the context service changes
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  // First load the service
  useEffect(() => {
    getPublicService(serviceId);

    if (error) {
      toast.error(error);
      clearErrors();
      navigate('/');
    }
    // eslint-disable-next-line
  }, [serviceId, error]);

  // Update service state when payment succeeds
  const handlePaymentSuccess = (updatedService) => {
    console.log('Payment successful, updating service with new funded amount:', updatedService.fundedAmount);
    setService(updatedService);
  };

  // Then try to get registry slug using only public endpoints
  useEffect(() => {
    const getRegistrySlug = async () => {
      if (!service || !service.registry) return;
      
      try {
        setLoadingRegistry(true);
        setRegistryError(null);
        
        // Use the public registry endpoint directly
        try {
          console.log('Trying to get public registry data');
          const publicResponse = await axios.get(`/api/registry/public/${service.registry}`);
          
          if (publicResponse.data && publicResponse.data.registry && publicResponse.data.registry.urlSlug) {
            console.log('Found registry slug:', publicResponse.data.registry.urlSlug);
            setRegistrySlug(publicResponse.data.registry.urlSlug);
          } else {
            throw new Error('Registry slug not found in response');
          }
        } catch (err) {
          console.error('Error getting registry data:', err);
          setRegistryError('Could not find registry information');
        }
      } finally {
        setLoadingRegistry(false);
      }
    };

    getRegistrySlug();
  }, [service]);

  // Show error notifications for registry loading failures
  useEffect(() => {
    if (registryError) {
      console.warn('Registry error (non-blocking):', registryError);
      // We don't show this as a toast to avoid confusion - it's a non-critical error
    }
  }, [registryError]);

  // Handle loading states
  if (serviceLoading || loadingRegistry || !service) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  const isFullyFunded = service.fundedAmount >= service.requestedAmount;

  if (isFullyFunded) {
    return (
      <div className="contribution-container">
        <div className="fully-funded-message">
          <h1>Service Fully Funded!</h1>
          <p>This service has already been fully funded. Thank you for your interest.</p>
          <button 
            onClick={() => {
              if (registrySlug) {
                navigate(`/registry/${registrySlug}`);
              } else {
                navigate('/');
              }
            }} 
            className="btn btn-primary"
          >
            {registrySlug ? 'Return to Registry' : 'Return to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contribution-container">
      <div className="contribution-header">
        <h1>Contribute to {service.title}</h1>
        <button 
          onClick={() => {
            if (registrySlug) {
              navigate(`/registry/${registrySlug}`);
            } else {
              navigate('/');
            }
          }} 
          className="btn btn-light"
        >
          <i className="fas fa-arrow-left"></i> {registrySlug ? 'Back to Registry' : 'Back to Home'}
        </button>
      </div>

      <div className="service-details">
        <h2>Service Details</h2>
        <p>{service.description}</p>
        <div className="funding-progress">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(service.fundedAmount / service.requestedAmount) * 100}%` }}
            ></div>
          </div>
          <div className="funding-info">
            <p>
              ${parseFloat(service.fundedAmount).toFixed(2)} of ${service.requestedAmount.toFixed(2)} funded
              <span className="percentage">({((service.fundedAmount / service.requestedAmount) * 100).toFixed(0)}%)</span>
            </p>
            <p>Amount remaining: ${(service.requestedAmount - service.fundedAmount).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <h2>Make Your Contribution</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm 
            service={service} 
            registrySlug={registrySlug} 
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Contribution;