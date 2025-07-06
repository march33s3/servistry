import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true, // Start as true while checking authentication
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User on mount
  useEffect(() => {
    loadUser();
  }, []);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth/user');

      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      console.error('Auth check failed:', err);
      dispatch({
        type: 'AUTH_ERROR'
      });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/register', formData, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
      return true; // Return success
    } catch (err) {
      console.error('Registration failed:', err);
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.msg || 'Registration failed'
      });
      return false; // Return failure
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
      return true; // Return success
    } catch (err) {
      console.error('Login failed:', err);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.msg || 'Login failed'
      });
      return false; // Return failure
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('/api/auth/forgot-password', { email }, config);

      dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS'
      });

      return true;
    } catch (err) {
      console.error('Forgot password failed:', err);
      dispatch({
        type: 'FORGOT_PASSWORD_FAIL',
        payload: err.response?.data?.msg || 'Failed to send reset email'
      });
      return false;
    }
  };

  // Reset Password
  const resetPassword = async (password, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password }, config);

      dispatch({
        type: 'RESET_PASSWORD_SUCCESS'
      });

      return true;
    } catch (err) {
      console.error('Reset password failed:', err);
      dispatch({
        type: 'RESET_PASSWORD_FAIL',
        payload: err.response?.data?.msg || 'Failed to reset password'
      });
      return false;
    }
  };

  // Update Profile
const updateProfile = async (profileData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put('/api/auth/profile', profileData, config);

    dispatch({
      type: 'PROFILE_UPDATE_SUCCESS',
      payload: res.data
    });

    return true;
  } catch (err) {
    console.error('Profile update failed:', err);
    dispatch({
      type: 'PROFILE_UPDATE_FAIL',
      payload: err.response?.data?.msg || 'Failed to update profile'
    });
    return false;
  }
};

// Update Password
const updatePassword = async (currentPassword, newPassword) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.put('/api/auth/password', { currentPassword, newPassword }, config);

    dispatch({
      type: 'PASSWORD_UPDATE_SUCCESS'
    });

    return true;
  } catch (err) {
    console.error('Password update failed:', err);
    dispatch({
      type: 'PASSWORD_UPDATE_FAIL',
      payload: err.response?.data?.msg || 'Failed to update password'
    });
    return false;
  }
};

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        updateProfile,
        updatePassword,
        register,
        loadUser,
        login,
        forgotPassword,
        resetPassword,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};