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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome{user ? `, ${user.email}` : ''}</p>
        <Link to="/create-registry" className="btn btn-primary">
          <i className="fas fa-plus"></i> Create Registry
        </Link>
      </div>

      <div className="registries-container">
        <h2>Your Registries</h2>
        {registries.length === 0 ? (
          <p>You have no registries yet. Create one to get started!</p>
        ) : (
          registries.map(registry => (
            <RegistryItem key={registry._id} registry={registry} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;