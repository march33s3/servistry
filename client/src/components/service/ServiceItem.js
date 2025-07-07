import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../context/service/ServiceState';
import { toast } from 'react-toastify';

const ServiceItem = ({ service }) => {
  const { deleteService } = useContext(ServiceContext);
  
  const { _id, title, description, link, requestedAmount, fundedAmount } = service;

  const progressPercentage = Math.min((fundedAmount / requestedAmount) * 100, 100);
  const isFullyFunded = progressPercentage >= 100;
  const remainingAmount = Math.max(requestedAmount - fundedAmount, 0);

  const onDelete = () => {
    if (window.confirm('Are you sure you want to remove this service from your registry?')) {
      deleteService(_id);
      toast.success('Service removed from registry');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="service-item">
      <div className="service-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3>{title}</h3>
          {isFullyFunded && (
            <span className="status-badge status-completed">
              <i className="fas fa-check-circle"></i> Funded
            </span>
          )}
        </div>
        <p className="description">{description}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="service-link"
        >
          <i className="fas fa-external-link-alt"></i> View Service Details
        </a>
      </div>
      
      <div className="service-funding">
        <div className="funding-progress">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="funding-info">
            <span>
              {formatCurrency(fundedAmount)} of {formatCurrency(requestedAmount)} funded
            </span>
            <span className="percentage">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          {!isFullyFunded && (
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              <i className="fas fa-info-circle"></i> {formatCurrency(remainingAmount)} remaining
            </div>
          )}
        </div>
      </div>
      
      {isFullyFunded ? (
        <div className="fully-funded">
          <i className="fas fa-trophy"></i> Goal Achieved! Thank you to all contributors.
        </div>
      ) : (
        <div className="service-actions">
          <Link to={`/edit-service/${_id}`} className="btn btn-secondary btn-sm">
            <i className="fas fa-edit"></i> Edit Service
          </Link>
          <button onClick={onDelete} className="btn btn-danger btn-sm">
            <i className="fas fa-trash-alt"></i> Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceItem;