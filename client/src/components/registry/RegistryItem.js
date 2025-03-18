import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';

const RegistryItem = ({ registry }) => {
  const { deleteRegistry } = useContext(RegistryContext);
  
  const { _id, title, description, urlSlug, createdAt } = registry;

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this registry?')) {
      deleteRegistry(_id);
      toast.success('Registry deleted');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="registry-item">
      <div className="registry-info">
        <h3>{title}</h3>
        <p className="description">{description}</p>
        <p className="created-date">Created on: {formatDate(createdAt)}</p>
      </div>
      <div className="registry-actions">
        <Link to={`/view-registry/${_id}`} className="btn btn-primary btn-sm">
          <i className="fas fa-eye"></i> View
        </Link>
        <Link to={`/edit-registry/${_id}`} className="btn btn-light btn-sm">
          <i className="fas fa-edit"></i> Edit
        </Link>
        <button onClick={onDelete} className="btn btn-danger btn-sm">
          <i className="fas fa-trash"></i> Delete
        </button>
        <div className="share-link">
          <input 
            type="text" 
            value={`${window.location.origin}/registry/${urlSlug}`}
            readOnly
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/registry/${urlSlug}`);
              toast.info('Link copied to clipboard');
            }}
            className="btn btn-light btn-sm"
          >
            <i className="fas fa-copy"></i> Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistryItem;