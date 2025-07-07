import axios from 'axios';

// API Configuration
const getApiUrl = () => {
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'https://bookish-space-xylophone-576qw65g6qv27qx5-5000.app.github.dev/';
  }
  
  // Production environment
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://servistry-backend.onrender.com';
  }
  
  // Fallback
  return 'http://localhost:5000';
};

// Set the base URL for all axios requests
export const API_BASE_URL = getApiUrl();

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor for debugging (optional)
if (process.env.NODE_ENV === 'development') {
  axios.interceptors.request.use(
    (config) => {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Add response interceptor for error handling (optional)
axios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Response Error:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default axios;