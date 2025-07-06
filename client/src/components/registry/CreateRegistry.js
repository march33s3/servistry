import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';

const CreateRegistry = () => {
  const { createRegistry, error, clearErrors } = useContext(RegistryContext);
  const navigate = useNavigate();

  // LOCAL loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const { title, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const registry = await createRegistry(formData);
    
    if (registry) {
      toast.success('Registry created successfully');
      navigate(`/view-registry/${registry._id}`);
    } else {
      toast.error(error || 'Failed to create registry');
      clearErrors();
      setIsSubmitting(false); // Reset on error
    }
  };

  return (
    <div className="form-container">
      <h1>Create Registry</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Registry Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
            placeholder="e.g., Baby Registry, Wedding Registry, Moving Fund"
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
            placeholder="Tell people what this registry is for and why these services would help..."
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Registry...' : 'Create Registry'}
          </button>
          <button 
            type="button" 
            className="btn btn-light" 
            onClick={() => navigate('/dashboard')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
      
      <div className="trust-indicator">
        Your registry is private until you choose to share it
      </div>
    </div>
  );
};

export default CreateRegistry;