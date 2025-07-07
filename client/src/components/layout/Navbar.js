import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link>
      </li>
      {user?.userType === 'admin' && (
        <li>
          <Link to="/admin">
            <i className="fas fa-cog"></i> Admin
          </Link>
        </li>
      )}
      <li>
        <a href="#!" onClick={onLogout} className="btn btn-secondary btn-sm">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register" className="btn btn-secondary btn-sm">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="btn btn-primary btn-sm">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>
          <Link to="/">
            Servistry
          </Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;