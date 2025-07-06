// client/src/components/onboarding/RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ onRegistration }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const onSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onRegistration({ firstName, lastName, email, password });
  };

  return (
    <div className="registration-step">
      <h2>Create Your Account</h2>
      <p>Just a few details to secure your registry and keep it private.</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-row">
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
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Create password (6+ characters)"
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
        </div>
        
        <button type="submit" className="btn btn-primary btn-block">
          Continue to Registry Details
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;