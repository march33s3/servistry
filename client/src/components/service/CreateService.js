import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../context/service/ServiceState';
import { toast } from 'react-toastify';

const CreateService = () => {
  const { createService, error, clearErrors } = useContext(ServiceContext);
  const { registryId } = useParams();
  const navigate = useNavigate();

  // LOCAL loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    requestedAmount: ''
  });

  const { title, description, link, requestedAmount } = formData;

  const onChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.name === 'requestedAmount' 
        ? parseFloat(e.target.value) || '' 
        : e.target.value 
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const serviceData = {
      ...formData,
      registry: registryId
    };
    
    const service = await createService(serviceData);
    
    if (service) {
      toast.success('Service added successfully');
      navigate(`/view-registry/${registryId}`);
    } else {
      toast.error(error || 'Failed to add service');
      clearErrors();
      setIsSubmitting(false); // Reset on error
    }
  };

  return (
    <div className="form-container">
      <h1>Add Service</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Service Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
            placeholder="e.g., House Cleaning, Meal Delivery, Pet Sitting"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Describe what this service provides and why it would be helpful..."
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="link">Service Link</label>
          <input
            type="url"
            name="link"
            id="link"
            value={link}
            onChange={onChange}
            placeholder="https://example.com/service"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requestedAmount">Funding Goal ($)</label>
          <input
            type="number"
            name="requestedAmount"
            id="requestedAmount"
            value={requestedAmount}
            onChange={onChange}
            min="0"
            step="0.01"
            placeholder="100.00"
            required
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Service...' : 'Add Service'}
          </button>
          <button 
            type="button" 
            className="btn btn-light" 
            onClick={() => navigate(`/view-registry/${registryId}`)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
      
      <div className="trust-indicator">
        Services are added to your private registry until you share it
      </div>
    </div>
  );
};

export default CreateService;