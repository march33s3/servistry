import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { ServiceContext } from '../../context/service/ServiceState';
import ServiceItem from '../service/ServiceItem';
import { toast } from 'react-toastify';

const ViewRegistry = () => {
  const { getRegistry, registry, error: registryError, clearErrors: clearRegistryErrors } = useContext(RegistryContext);
  const { services, getRegistryServices, error: serviceError, clearErrors: clearServiceErrors } = useContext(ServiceContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getRegistry(id);

    if (registryError) {
      toast.error(registryError);
      clearRegistryErrors();
      navigate('/dashboard');
    }
    // eslint-disable-next-line
  }, [id, registryError]);

  useEffect(() => {
    if (registry) {
      getRegistryServices(id);
    }

    if (serviceError) {
      toast.error(serviceError);
      clearServiceErrors();
    }
    // eslint-disable-next-line
  }, [registry, serviceError]);

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/registry/${registry.urlSlug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Registry link copied! Share it with friends and family.');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success('Registry link copied! Share it with friends and family.');
    }
    setTimeout(() => setCopied(false), 3000);
  };

  const getRegistryStats = () => {
    if (!services || services.length === 0) {
      return { totalServices: 0, totalRequested: 0, totalFunded: 0, percentage: 0 };
    }

    const totalRequested = services.reduce((sum, service) => sum + service.requestedAmount, 0);
    const totalFunded = services.reduce((sum, service) => sum + service.fundedAmount, 0);
    const percentage = totalRequested > 0 ? (totalFunded / totalRequested) * 100 : 0;

    return {
      totalServices: services.length,
      totalRequested,
      totalFunded,
      percentage: Math.min(percentage, 100)
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (!registry) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  const stats = getRegistryStats();

  return (
    <div className="view-registry-container">
      <div className="registry-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0, flex: 1 }}>{registry.title}</h1>
          <span className="status-badge status-active">
            <i className="fas fa-circle"></i> Live
          </span>
        </div>
        
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{registry.description}</p>
        
        {/* Registry Statistics */}
        {stats.totalServices > 0 && (
          <div style={{
            background: 'var(--color-bg-mint)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            border: '1px solid rgba(210, 175, 64, 0.2)'
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0', 
              color: 'var(--color-text-primary)',
              fontSize: '1.125rem'
            }}>
              <i className="fas fa-chart-line"></i> Registry Progress
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-gold)' }}>
                  {stats.totalServices}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {stats.totalServices === 1 ? 'Service' : 'Services'}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                  {formatCurrency(stats.totalFunded)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Total Funded
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                  {formatCurrency(stats.totalRequested)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Total Goal
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-success)' }}>
                  {stats.percentage.toFixed(0)}%
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Complete
                </div>
              </div>
            </div>
            
            <div className="progress-bar" style={{ margin: '0.5rem 0' }}>
              <div 
                className="progress" 
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="registry-actions">
          <Link to={`/edit-registry/${id}`} className="btn btn-secondary">
            <i className="fas fa-edit"></i> Edit Details
          </Link>
          <Link to={`/create-service/${id}`} className="btn btn-primary">
            <i className="fas fa-plus"></i> Add Service
          </Link>
        </div>
        
        <div className="share-link">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <i className="fas fa-share-alt" style={{ color: 'var(--color-gold)' }}></i>
            <p style={{ margin: 0, fontWeight: '500' }}>Share your registry:</p>
          </div>
          <div className="link-container">
            <input 
              type="text" 
              value={`${window.location.origin}/registry/${registry.urlSlug}`}
              readOnly
              style={{ 
                fontSize: '0.875rem',
                background: 'var(--color-bg-primary)',
                color: 'var(--color-text-muted)'
              }}
            />
            <div className="copy-btn-wrapper">
              <button
                onClick={handleCopyLink}
                className="btn btn-secondary btn-sm"
                style={{ whiteSpace: 'nowrap' }}
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
              <span className={`copy-tooltip${copied ? ' show' : ''}`}>Link ready to share!</span>
            </div>
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: 'var(--color-text-muted)', 
            marginTop: '0.5rem',
            textAlign: 'center'
          }}>
            <i className="fas fa-info-circle"></i> Anyone with this link can view and contribute to your registry
          </div>
        </div>
      </div>

      <div className="services-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>
            <i className="fas fa-list-alt"></i> Your Services
          </h2>
          {services.length > 0 && (
            <Link to={`/create-service/${id}`} className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i> Add Another
            </Link>
          )}
        </div>
        
        {services.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <i className="fas fa-gift" style={{ 
              fontSize: '3rem', 
              color: 'var(--color-gold)', 
              marginBottom: '1rem' 
            }}></i>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              Ready to Add Services?
            </h3>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              marginBottom: '2rem',
              fontSize: '1.125rem',
              maxWidth: '400px',
              margin: '0 auto 2rem'
            }}>
              Add services to your registry so friends and family can contribute to what you really need.
            </p>
            <Link to={`/create-service/${id}`} className="btn btn-primary">
              <i className="fas fa-rocket"></i> Add Your First Service
            </Link>
          </div>
        ) : (
          <div>
            {services.map(service => (
              <ServiceItem key={service._id} service={service} />
            ))}
            
            <div style={{
              background: 'var(--color-bg-primary)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              marginTop: '2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                marginBottom: '1rem', 
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-heading)'
              }}>
                <i className="fas fa-lightbulb"></i> Maximize Your Success
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)'
              }}>
                <div>
                  <i className="fas fa-users" style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}></i>
                  Share with family & friends
                </div>
                <div>
                  <i className="fas fa-edit" style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}></i>
                  Keep descriptions clear & specific
                </div>
                <div>
                  <i className="fas fa-target" style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}></i>
                  Set realistic funding goals
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRegistry;