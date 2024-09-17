import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for a token or authentication state

  return isAuthenticated ? children : <Navigate to="/login" />;
//( 
//    <Component {...rest} />
//  ) : (
//    <Navigate to="/login" /> // Redirect to login if not authenticated
//  );
};

export default PrivateRoute;