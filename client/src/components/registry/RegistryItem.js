import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';

const RegistryItem = ({ registry }) => {
  const { deleteRegistry } = useContext(RegistryContext);
  const [copied, setCopied] = useState(false);
  
  const { _id, title, description, urlSlug, createdAt } = registry;

  const onDelete = () => {
    if (window.confirm('Are you sure you want to permanently delete this registry? This action cannot be undone.')) {
      deleteRegistry(_id);
      toast.success('Registry removed successfully');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/registry/${urlSlug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.info('Registry link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      toast.info('Registry link copied to clipboard!');
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    // You can enhance this logic based on your registry data
    return <span className="status-badge status-active">Active</span>;
  };

  return (
    <div className="registry-item">
      <div className="registry-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3>{title}</h3>
          {getStatusBadge()}
        </div>
        <p className="description">{description}</p>
        <p className="created-date">
          <i className="fas fa-calendar-alt"></i> Created on {formatDate(createdAt)}
        </p>
      </div>
      
      <div className="registry-actions">
        <Link to={`/view-registry/${_id}`} className="btn btn-primary btn-sm">
          <i className="fas fa-eye"></i> View & Manage
        </Link>
        <Link to={`/edit-registry/${_id}`} className="btn btn-secondary btn-sm">
          <i className="fas fa-edit"></i> Edit Details
        </Link>
        <button onClick={onDelete} className="btn btn-danger btn-sm">
          <i className="fas fa-trash-alt"></i> Remove
        </button>
      </div>
      
      <div className="share-link">
        <p><i className="fas fa-share-alt"></i> Share your registry with friends and family:</p>
        <div className="link-container">
          <input 
            type="text" 
            value={`${window.location.origin}/registry/${urlSlug}`}
            readOnly
            style={{ fontSize: '0.875rem' }}
          />
          <div className="copy-btn-wrapper">
            <button 
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
            >
              {copied ? (
                <>
                  <i className="fas fa-check"></i> Copied!
                </>
              ) : (
                <>
                  <i className="fas fa-copy"></i> Copy Link
                </>
              )}
            </button>
            <span className={`copy-tooltip${copied ? ' show' : ''}`}>Link copied!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryItem;