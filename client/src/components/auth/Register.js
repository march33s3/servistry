import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { toast } from 'react-toastify';

const Register = () => {
  // REMOVED loading from context - only get what we need
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  // LOCAL loading state only
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const { firstName, lastName, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    if (error) {
      toast.error(error);
      clearErrors();
      setIsSubmitting(false); // Reset local loading on error
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await register({ firstName, lastName, email, password });
      if (!success) {
        setIsSubmitting(false);
      }
      // If success, user will be redirected via useEffect
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Create Your Account</h1>
        <p>Join thousands who trust Servistry for their service registries</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="Enter your first name"
              className={formErrors.firstName ? 'error' : ''}
              required
            />
            {formErrors.firstName && <div className="form-error">{formErrors.firstName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={onChange}
              placeholder="Enter your last name"
              className={formErrors.lastName ? 'error' : ''}
              required
            />
            {formErrors.lastName && <div className="form-error">{formErrors.lastName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email address"
              className={formErrors.email ? 'error' : ''}
              required
            />
            {formErrors.email && <div className="form-error">{formErrors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Create a secure password (6+ characters)"
              className={formErrors.password ? 'error' : ''}
              minLength="6"
              required
            />
            {formErrors.password && <div className="form-error">{formErrors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
              className={formErrors.confirmPassword ? 'error' : ''}
              minLength="6"
              required
            />
            {formErrors.confirmPassword && <div className="form-error">{formErrors.confirmPassword}</div>}
          </div>
          <button 
            type="submit" 
            className={`btn btn-primary btn-block ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account Securely'}
          </button>
        </form>
        
        <div className="trust-indicator">
          Your account is secured and your privacy is protected
        </div>
        
        <p className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;