import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';

const EditRegistry = () => {
  const { getRegistry, registry, updateRegistry, error, clearErrors, loading } = useContext(RegistryContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    getRegistry(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (registry) {
      setFormData({
        title: registry.title,
        description: registry.description
      });
    }
  }, [registry]);

  const { title, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const updatedRegistry = await updateRegistry(id, formData);
    
    if (updatedRegistry) {
      toast.success('Registry updated successfully');
      navigate(`/view-registry/${id}`);
    } else {
      toast.error(error || 'Failed to update registry');
      clearErrors();
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Registry</h1>
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
          <button type="submit" className="btn btn-primary">Update Registry</button>
          <button type="button" className="btn btn-light" onClick={() => navigate(`/view-registry/${id}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRegistry;