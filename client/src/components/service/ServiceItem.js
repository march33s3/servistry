import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../context/service/ServiceState';
import { toast } from 'react-toastify';

const ServiceItem = ({ service }) => {
  const { deleteService } = useContext(ServiceContext);
  
  const { _id, title, description, link, requestedAmount, fundedAmount } = service;

  const progressPercentage = (fundedAmount / requestedAmount) * 100;

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(_id);
      toast.success('Service deleted');
    }
  };

  return (
    <div className="service-item">
      <div className="service-info">
        <h3>{title}</h3>
        <p className="description">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="service-link">
          <i className="fas fa-external-link-alt"></i> View Service
        </a>
      </div>
      <div className="service-funding">
        <div className="funding-progress">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${progressPercentage > 100 ? 100 : progressPercentage}%` }}
            ></div>
          </div>
          <div className="funding-info">
            <p>
              ${fundedAmount.toFixed(2)} of ${requestedAmount.toFixed(2)} funded
              <span className="percentage">({progressPercentage.toFixed(0)}%)</span>
            </p>
          </div>
        </div>
      </div>
      <div className="service-actions">
        <Link to={`/edit-service/${_id}`} className="btn btn-light btn-sm">
          <i className="fas fa-edit"></i> Edit
        </Link>
        <button onClick={onDelete} className="btn btn-danger btn-sm">
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceItem;