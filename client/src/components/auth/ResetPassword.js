import React, { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { resetPassword, error, clearErrors } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();

  // LOCAL loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [reset, setReset] = useState(false);

  const { password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    const success = await resetPassword(password, token);
    
    if (success) {
      setReset(true);
      toast.success('Password reset successful');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      toast.error(error || 'Failed to reset password');
      clearErrors();
      setIsSubmitting(false); // Reset on error
    }
  };

  if (reset) {
    return (
      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Password Reset</h1>
          <p>
            Your password has been reset successfully. You will be redirected to the login page shortly.
          </p>
          <p className="auth-link">
            <Link to="/login">Go to Login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Reset Password</h1>
        <p>Enter your new password</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`btn btn-primary btn-block ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
        
        <div className="trust-indicator">
          Your password is secured with bank-level encryption
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;