import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../context/service/ServiceState';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Payment Form Component
const PaymentForm = ({ service, registrySlug }) => {
  const { createPaymentIntent } = useContext(ServiceContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [processingStatus, setProcessingStatus] = useState(''); // For detailed status updates
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setCardError(null);
    setProcessingStatus('Initiating payment...');

    try {
      // Create payment intent on the server
      setProcessingStatus('Creating payment request...');
      const paymentIntentResponse = await createPaymentIntent(
        service._id,
        parseFloat(amount),
        email
      );

      if (!paymentIntentResponse) {
        setLoading(false);
        setProcessingStatus('Payment setup failed.');
        return;
      }

      // Confirm the payment with Stripe
      setProcessingStatus('Processing your card...');
      const result = await stripe.confirmCardPayment(paymentIntentResponse.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email
          }
        }
      });

      if (result.error) {
        setCardError(result.error.message);
        setProcessingStatus('Payment failed');
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setProcessingStatus('Payment successful!');
          setIsProcessingComplete(true);
          toast.success('Payment successful! Thank you for your contribution.');
          
          // Add a short delay to show the success message before redirecting
          setTimeout(() => {
            navigate(`/registry/${registrySlug}`);
          }, 2000);
        } else {
          setProcessingStatus(`Payment ${result.paymentIntent.status}`);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setProcessingStatus('Payment processing error');
      toast.error('There was an error processing your payment. Please try again.');
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };

  // Calculate amount left to fund
  const amountLeftToFund = Math.max(0, service.requestedAmount - service.fundedAmount);

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
        />
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
        />
      </div>
      <div className="form-group">
        <label>Card Details</label>
        <div className="card-element-container">
          <CardElement options={cardElementOptions} />
        </div>
        {cardError && <div className="card-error">{cardError}</div>}
      </div>

      {/* Add status indicator */}
      {processingStatus && (
        <div className={`payment-status ${isProcessingComplete ? 'success' : ''}`}>
          <p>{processingStatus}</p>
          {loading && <div className="processing-spinner"></div>}
        </div>
      )}
      
      {/* Disable button when processing */}
      <button
        type="submit"
        disabled={!stripe || loading || isProcessingComplete}
        className={`btn btn-primary btn-block ${loading ? 'btn-loading' : ''}`}
      >
        {loading ? 'Processing...' : isProcessingComplete ? 'Payment Complete!' : 'Make Contribution'}
      </button>
      
      {/* Add safety message */}
      {loading && (
        <div className="payment-processing-warning">
          <p><i className="fas fa-exclamation-circle"></i> Please do not close your browser window during payment processing</p>
        </div>
      )}
    </form>
  );
};

// Main Contribution Component
const Contribution = () => {
  const { getService, service, loading: serviceLoading, error, clearErrors } = useContext(ServiceContext);
  const { getPublicRegistry, publicRegistry, loading: registryLoading } = useContext(RegistryContext);
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getService(serviceId);

    if (error) {
      toast.error(error);
      clearErrors();
      navigate('/');
    }
    // eslint-disable-next-line
  }, [serviceId, error]);

  useEffect(() => {
    if (service && service.registry) {
      // Fetch the registry to get the slug for navigation after payment
      getPublicRegistry(service.registry);
    }
    // eslint-disable-next-line
  }, [service]);

  if (serviceLoading || registryLoading || !service || !publicRegistry) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  const isFullyFunded = service.fundedAmount >= service.requestedAmount;
  const registrySlug = publicRegistry.registry.urlSlug;

  if (isFullyFunded) {
    return (
      <div className="contribution-container">
        <div className="fully-funded-message">
          <h1>Service Fully Funded!</h1>
          <p>This service has already been fully funded. Thank you for your interest.</p>
          <button onClick={() => navigate(`/registry/${registrySlug}`)} className="btn btn-primary">
            Return to Registry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contribution-container">
      <div className="contribution-header">
        <h1>Contribute to {service.title}</h1>
        <button onClick={() => navigate(`/registry/${registrySlug}`)} className="btn btn-light">
          <i className="fas fa-arrow-left"></i> Back to Registry
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
              ${service.fundedAmount.toFixed(2)} of ${service.requestedAmount.toFixed(2)} funded
              <span className="percentage">({((service.fundedAmount / service.requestedAmount) * 100).toFixed(0)}%)</span>
            </p>
            <p>Amount remaining: ${(service.requestedAmount - service.fundedAmount).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <h2>Make Your Contribution</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm service={service} registrySlug={registrySlug} />
        </Elements>
        <div className="secure-payment-info">
          <i className="fas fa-lock"></i> All payments are secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default Contribution;