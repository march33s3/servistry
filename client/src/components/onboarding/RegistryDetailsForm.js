// client/src/components/onboarding/RegistryDetailsForm.js
import React, { useState } from 'react';

const RegistryDetailsForm = ({ category, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const { title, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="registry-details-step">
      <h2>Name Your Registry</h2>
      <p>Give your {category?.name.toLowerCase()} registry a title and description.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Registry Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
            placeholder={`e.g., Sarah's ${category?.name} Registry, Help for the Johnson Family`}
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
            placeholder="Tell your friends and family what this registry is for and how services would help..."
            rows="4"
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className={`btn btn-primary btn-block ${isSubmitting ? 'btn-loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Your Registry...' : 'Create Registry'}
        </button>
      </form>
    </div>
  );
};

export default RegistryDetailsForm;