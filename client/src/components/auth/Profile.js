// File: client/src/components/auth/Profile.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile, updatePassword, error, clearErrors } = useContext(AuthContext);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  // Handle errors from context
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
      setIsUpdatingProfile(false);
      setIsUpdatingPassword(false);
    }
  }, [error, clearErrors]);

  const onProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (profileErrors[e.target.name]) {
      setProfileErrors({ ...profileErrors, [e.target.name]: '' });
    }
  };

  const onPasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({ ...passwordErrors, [e.target.name]: '' });
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    
    if (!profileData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!profileData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    return errors;
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const onProfileSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateProfileForm();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    setIsUpdatingProfile(true);
    setProfileErrors({});
    
    const success = await updateProfile(profileData);
    
    if (success) {
      toast.success('Profile updated successfully');
    }
    
    setIsUpdatingProfile(false);
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordErrors({});
    
    const success = await updatePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (success) {
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordSection(false);
    }
    
    setIsUpdatingPassword(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserTypeDisplay = (userType) => {
    switch (userType) {
      case 'admin':
        return { text: 'Administrator', color: 'var(--color-gold)', icon: 'fas fa-crown' };
      case 'premium':
        return { text: 'Premium User', color: 'var(--color-success)', icon: 'fas fa-star' };
      default:
        return { text: 'Standard User', color: 'var(--color-text-secondary)', icon: 'fas fa-user' };
    }
  };

  if (!user) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  const userTypeInfo = getUserTypeDisplay(user.userType);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-gold), var(--color-bg-mint))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          fontSize: '2rem',
          color: 'white',
          fontWeight: '600'
        }}>
          {user.firstName?.[0]}{user.lastName?.[0]}
        </div>
        <h1 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
          {user.firstName} {user.lastName}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          {user.email}
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--color-bg-mint)',
          borderRadius: 'var(--radius-full)',
          color: userTypeInfo.color,
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          <i className={userTypeInfo.icon}></i>
          {userTypeInfo.text}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Account Information Section */}
        <div className="form-container">
          <h2 style={{ 
            marginBottom: '1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontFamily: 'var(--font-heading)'
          }}>
            <i className="fas fa-user-edit" style={{ color: 'var(--color-gold)' }}></i>
            Account Information
          </h2>
          
          <form onSubmit={onProfileSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={profileData.firstName}
                onChange={onProfileChange}
                className={profileErrors.firstName ? 'error' : ''}
                required
              />
              {profileErrors.firstName && <div className="form-error">{profileErrors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={profileData.lastName}
                onChange={onProfileChange}
                className={profileErrors.lastName ? 'error' : ''}
                required
              />
              {profileErrors.lastName && <div className="form-error">{profileErrors.lastName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={profileData.email}
                onChange={onProfileChange}
                className={profileErrors.email ? 'error' : ''}
                required
              />
              {profileErrors.email && <div className="form-error">{profileErrors.email}</div>}
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                <i className="fas fa-info-circle"></i> Changing your email will require verification
              </small>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${isUpdatingProfile ? 'btn-loading' : ''}`}
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? 'Updating Profile...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Security Section */}
        <div className="form-container">
          <h2 style={{ 
            marginBottom: '1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontFamily: 'var(--font-heading)'
          }}>
            <i className="fas fa-shield-alt" style={{ color: 'var(--color-success)' }}></i>
            Security Settings
          </h2>

          {!showPasswordSection ? (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'var(--color-bg-primary)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>Password</h4>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    Last updated: {user.updatedAt ? formatDate(user.updatedAt) : 'Unknown'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowPasswordSection(true)}
                  className="btn btn-secondary btn-sm"
                >
                  <i className="fas fa-edit"></i> Change Password
                </button>
              </div>
              
              <div className="trust-indicator">
                Your password is encrypted and secure
              </div>
            </div>
          ) : (
            <form onSubmit={onPasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={onPasswordChange}
                  className={passwordErrors.currentPassword ? 'error' : ''}
                  required
                />
                {passwordErrors.currentPassword && <div className="form-error">{passwordErrors.currentPassword}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={onPasswordChange}
                  className={passwordErrors.newPassword ? 'error' : ''}
                  minLength="6"
                  required
                />
                {passwordErrors.newPassword && <div className="form-error">{passwordErrors.newPassword}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={onPasswordChange}
                  className={passwordErrors.confirmPassword ? 'error' : ''}
                  minLength="6"
                  required
                />
                {passwordErrors.confirmPassword && <div className="form-error">{passwordErrors.confirmPassword}</div>}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isUpdatingPassword ? 'btn-loading' : ''}`}
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? 'Updating Password...' : 'Update Password'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-light" 
                  onClick={() => {
                    setShowPasswordSection(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                    setPasswordErrors({});
                  }}
                  disabled={isUpdatingPassword}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Account Details */}
        <div className="form-container">
          <h2 style={{ 
            marginBottom: '1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontFamily: 'var(--font-heading)'
          }}>
            <i className="fas fa-info-circle" style={{ color: 'var(--color-text-secondary)' }}></i>
            Account Details
          </h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--color-bg-primary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontWeight: '500' }}>Member Since</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>
                {user.createdAt ? formatDate(user.createdAt) : 'Unknown'}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--color-bg-primary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontWeight: '500' }}>Account Type</span>
              <span style={{ 
                color: userTypeInfo.color,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <i className={userTypeInfo.icon}></i>
                {userTypeInfo.text}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--color-bg-primary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <span style={{ fontWeight: '500' }}>User ID</span>
              <span style={{ 
                color: 'var(--color-text-secondary)',
                fontFamily: 'monospace',
                fontSize: '0.875rem'
              }}>
                {user._id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;