import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { forgotPassword, error, clearErrors } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const success = await forgotPassword(email);
    
    if (success) {
      setSent(true);
      toast.success('Password reset email sent');
    } else {
      toast.error(error || 'Failed to send reset email');
      clearErrors();
    }
  };

  if (sent) {
    return (
      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Email Sent</h1>
          <p>
            A password reset link has been sent to {email}. Please check your inbox and follow the instructions.
          </p>
          <p className="auth-link">
            <Link to="/login">Return to Login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Forgot Password</h1>
        <p>Enter your email address to receive a password reset link</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Send Reset Link</button>
        </form>
        <p className="auth-link">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;