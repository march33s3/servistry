import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Servistry</h1>
        <p className="lead">
          Create your own registry and share it with friends and family.
        </p>
        <div className="home-buttons">
          <Link to="/register" className="btn btn-primary">
            Create a Registry
          </Link>
          <Link to="/login" className="btn btn-light">
            Sign In
          </Link>
        </div>
      </div>
      <div className="home-features">
        <div className="feature">
          <i className="fas fa-clipboard-list"></i>
          <h3>Create Registries</h3>
          <p>Create and manage multiple registries for any occasion.</p>
        </div>
        <div className="feature">
          <i className="fas fa-share-alt"></i>
          <h3>Easy Sharing</h3>
          <p>Share your registry with a simple link to friends and family.</p>
        </div>
        <div className="feature">
          <i className="fas fa-credit-card"></i>
          <h3>Secure Payments</h3>
          <p>Contributors can securely contribute to your desired services.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;