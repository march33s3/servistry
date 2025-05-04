import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';

const CreateRegistry = () => {
  const { createRegistry, error, clearErrors } = useContext(RegistryContext);
  const navigate = useNavigate();

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
    
    const registry = await createRegistry(formData);
    
    if (registry) {
      toast.success('Registry created successfully');
      navigate(`/view-registry/${registry._id}`);
    } else {
      toast.error(error || 'Failed to create registry');
      clearErrors();
    }
  };

  return (
    <div className="form-container">
      <h1>Create Registry</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
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
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Create Registry</button>
          <button type="button" className="btn btn-light" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRegistry;