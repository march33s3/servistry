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

  return (
    <div className="public-registry-container">
      <div className="registry-header">
        <h1>{registry.title}</h1>
        <p className="description">{registry.description}</p>
      </div>

      <div className="services-list">
        <h2>Services</h2>
        {services.length === 0 ? (
          <p>No services available in this registry.</p>
        ) : (
          services.map(service => {
            const progressPercentage = (service.fundedAmount / service.requestedAmount) * 100;
            const isFullyFunded = progressPercentage >= 100;
            
            return (
              <div key={service._id} className="public-service-item">
                <div className="service-header">
                  <h3>{service.title}</h3>
                  <a href={service.link} target="_blank" rel="noopener noreferrer" className="service-link">
                    <i className="fas fa-external-link-alt"></i> View Service
                  </a>
                </div>
                <p className="description">{service.description}</p>
                <div className="funding-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${progressPercentage > 100 ? 100 : progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="funding-info">
                    <p>
                      ${service.fundedAmount.toFixed(2)} of ${service.requestedAmount.toFixed(2)} funded
                      <span className="percentage">({progressPercentage.toFixed(0)}%)</span>
                    </p>
                  </div>
                </div>
                {!isFullyFunded && (
                  <Link to={`/contribute/${service._id}`} className="btn btn-primary btn-block">
                    Contribute
                  </Link>
                )}
                {isFullyFunded && (
                  <div className="fully-funded">
                    <i className="fas fa-check-circle"></i> Fully Funded
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PublicRegistry;