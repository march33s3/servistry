import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthState';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, loadUser, user } = useContext(AuthContext);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
        await loadUser();
        setVerifying(false);
    };
    verifyAdmin();
    
    // eslint-disable-next-line
  }, []);

  if (loading || verifying) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  // First check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login - you'll need to handle this in your routing
    window.location.href = '/login';
    return null;
  }

  // Then check if user is admin
  if (user?.userType !== 'admin') {
    return (
      <div className="access-denied-container">
        <div className="access-denied-content">
          <h1>Access Denied</h1>
          <p>You need administrator privileges to access this page.</p>
          <p>Current user type: {user?.userType || 'Not set'}</p>
          <button onClick={() => window.history.back()} className="btn btn-light">
            Go Back
          </button>
        </div>
        
        <style jsx>{`
          .access-denied-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 70vh;
            padding: 2rem;
          }
          
          .access-denied-content {
            text-align: center;
            background: white;
            padding: 3rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 400px;
          }
          
          .access-denied-content h1 {
            color: #dc3545;
            margin-bottom: 1rem;
          }
          
          .access-denied-content p {
            margin-bottom: 1rem;
            color: #666;
          }
          
          .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
          }
          
          .btn-light {
            background: #f8f9fa;
            color: #333;
            border: 1px solid #ddd;
          }
          
          .btn-light:hover {
            background: #e2e6ea;
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default AdminRoute;