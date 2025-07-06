import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../context/service/ServiceState';
import { toast } from 'react-toastify';

const EditService = () => {
  const { getService, service, updateService, error, clearErrors, loading } = useContext(ServiceContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // LOCAL loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    requestedAmount: ''
  });

  useEffect(() => {
    getService(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        link: service.link,
        requestedAmount: service.requestedAmount
      });
    }
  }, [service]);

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
    
    const updatedService = await updateService(id, formData);
    
    if (updatedService) {
      toast.success('Service updated successfully');
      navigate(`/view-registry/${service.registry}`);
    } else {
      toast.error(error || 'Failed to update service');
      clearErrors();
      setIsSubmitting(false); // Reset on error
    }
  };

  // Keep global loading for data fetching
  if (loading || !service) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Service</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Service Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
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
            required
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating Service...' : 'Update Service'}
          </button>
          <button 
            type="button" 
            className="btn btn-light" 
            onClick={() => navigate(`/view-registry/${service.registry}`)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;