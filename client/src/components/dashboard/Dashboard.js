import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { RegistryContext } from '../../context/registry/RegistryState';
import RegistryItem from '../registry/RegistryItem';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { registries, getUserRegistries, loading, error, clearErrors } = useContext(RegistryContext);

  useEffect(() => {
    getUserRegistries();

    if (error) {
      toast.error(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserDisplayName = () => {
    if (user?.firstName) {
      return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`;
    }
    return user?.email || '';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Service Registries</h1>
        <p>
          {getGreeting()}, {getUserDisplayName()}! 
          {registries.length === 0 
            ? ' Get started by creating your first registry.' 
            : ` You have ${registries.length} ${registries.length === 1 ? 'registry' : 'registries'}.`
          }
        </p>
        
        {user?.userType === 'admin' && (
          <div className="admin-section">
            <h3><i className="fas fa-crown"></i> Admin Tools</h3>
            <div className="admin-buttons">
              <Link to="/admin" className="btn btn-secondary btn-sm">
                <i className="fas fa-cog"></i> Admin Panel
              </Link>
            </div>
          </div>
        )}
        
        <Link to="/create-registry" className="btn btn-primary">
          <i className="fas fa-plus"></i> Create New Registry
        </Link>
      </div>

      <div className="registries-container">
        {registries.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <i className="fas fa-gift" style={{ 
              fontSize: '3rem', 
              color: 'var(--color-gold)', 
              marginBottom: '1rem' 
            }}></i>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              Welcome to Servistry!
            </h2>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              marginBottom: '2rem', 
              fontSize: '1.125rem' 
            }}>
              Create your first service registry and start receiving meaningful contributions from friends and family.
            </p>
            <Link to="/create-registry" className="btn btn-primary">
              <i className="fas fa-rocket"></i> Create Your First Registry
            </Link>
          </div>
        ) : (
          <>
            <h2>
              <i className="fas fa-list-alt"></i> Active Registries
            </h2>
            {registries.map(registry => (
              <RegistryItem key={registry._id} registry={registry} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;