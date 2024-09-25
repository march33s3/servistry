// src/config.js

const getBackendUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_BACKEND_URL;
    } else if (process.env.NODE_ENV === 'production') {
      return process.env.REACT_APP_BACKEND_URL;
    } else {
      throw new Error('Unknown environment');
    }
  };
  
  export const BACKEND_URL = getBackendUrl();