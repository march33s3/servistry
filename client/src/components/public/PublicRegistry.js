import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';

const PublicRegistry = () => {
  const { getPublicRegistry, publicRegistry, loading, error, clearErrors } = useContext(RegistryContext);
  const { slug } = useParams();

  useEffect(() => {
    getPublicRegistry(slug);

    if (error) {
      toast.error(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [slug, error]);

  if (loading || !publicRegistry) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  const { registry, services } = publicRegistry;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getTotalProgress = () => {
    if (services.length === 0) return { total: 0, funded: 0, percentage: 0 };
    
    const total = services.reduce((sum, service) => sum + service.requestedAmount, 0);
    const funded = services.reduce((sum, service) => sum + service.fundedAmount, 0);
    const percentage = total > 0 ? (funded / total) * 100 : 0;
    
    return { total, funded, percentage: Math.min(percentage, 100) };
  };

  const totalProgress = getTotalProgress();

  return (
    <div className="public-registry-container">
      <div className="registry-header">
        <h1>{registry.title}</h1>
        <p className="description">{registry.description}</p>
        
        {services.length > 0 && (
          <div style={{ marginTop: '2rem', maxWidth: '400px', margin: '2rem auto 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>
                Overall Progress
              </h3>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--color-text-secondary)',
                margin: 0 
              }}>
                {formatCurrency(totalProgress.funded)} of {formatCurrency(totalProgress.total)}
              </p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${totalProgress.percentage}%` }}
              ></div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)'
            }}>
              {totalProgress.percentage.toFixed(0)}% of total goal reached
            </div>
          </div>
        )}
      </div>

      <div className="services-list">
        <h2>
          <i className="fas fa-list"></i> Available Services
          {services.length > 0 && (
            <span style={{ 
              fontSize: '1rem', 
              fontWeight: 'normal', 
              color: 'var(--color-text-secondary)',
              marginLeft: '0.5rem'
            }}>
              ({services.length} {services.length === 1 ? 'service' : 'services'})
            </span>
          )}
        </h2>
        
        {services.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <i className="fas fa-inbox" style={{ 
              fontSize: '3rem', 
              color: 'var(--color-text-muted)', 
              marginBottom: '1rem' 
            }}></i>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              No Services Yet
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              The registry owner hasn't added any services yet. Check back soon!
            </p>
          </div>
        ) : (
          services.map(service => {
            const progressPercentage = Math.min((service.fundedAmount / service.requestedAmount) * 100, 100);
            const isFullyFunded = progressPercentage >= 100;
            const remainingAmount = Math.max(service.requestedAmount - service.fundedAmount, 0);
            
            return (
              <div key={service._id} className="public-service-item">
                <div className="service-header">
                  <h3>{service.title}</h3>
                  <a 
                    href={service.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="service-link"
                  >
                    <i className="fas fa-external-link-alt"></i> View Service
                  </a>
                </div>
                
                <p className="description">{service.description}</p>
                
                <div className="funding-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="funding-info">
                    <span>
                      {formatCurrency(service.fundedAmount)} of {formatCurrency(service.requestedAmount)}
                    </span>
                    <span className="percentage">
                      {progressPercentage.toFixed(0)}%
                    </span>
                  </div>
                  {!isFullyFunded && (
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--color-text-muted)', 
                      marginTop: '0.5rem',
                      textAlign: 'center'
                    }}>
                      <i className="fas fa-target"></i> {formatCurrency(remainingAmount)} needed to reach goal
                    </div>
                  )}
                </div>
                
                {isFullyFunded ? (
                  <div className="fully-funded">
                    <i className="fas fa-check-circle"></i> 
                    Fully Funded - Thank You!
                  </div>
                ) : (
                  <Link 
                    to={`/contribute/${service._id}`} 
                    className="btn btn-primary btn-block"
                    style={{ 
                      marginTop: '1rem',
                      fontSize: '1rem',
                      padding: '0.875rem 1.5rem'
                    }}
                  >
                    <i className="fas fa-heart"></i> 
                    Contribute to This Service
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div style={{ 
        marginTop: '3rem', 
        textAlign: 'center',
        padding: '2rem',
        background: 'var(--color-bg-mint)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ 
          marginBottom: '1rem', 
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-heading)'
        }}>
          <i className="fas fa-shield-alt"></i> Secure Contributions
        </h3>
        <p style={{ 
          color: 'var(--color-text-secondary)',
          marginBottom: '1rem',
          fontSize: '1rem'
        }}>
          All payments are processed securely through Stripe. Your payment information is never stored on our servers.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)'
        }}>
          <span><i className="fas fa-lock"></i> SSL Encrypted</span>
          <span><i className="fas fa-credit-card"></i> Stripe Secured</span>
          <span><i className="fas fa-user-shield"></i> Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};

export default PublicRegistry;