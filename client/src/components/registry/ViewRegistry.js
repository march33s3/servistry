import React, { useContext, useEffect } from 'react';
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

  if (!registry) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  return (
    <div className="view-registry-container">
      <div className="registry-header">
        <h1>{registry.title}</h1>
        <p>{registry.description}</p>
        <div className="registry-actions">
          <Link to={`/edit-registry/${id}`} className="btn btn-light">
            <i className="fas fa-edit"></i> Edit Registry
          </Link>
          <Link to={`/create-service/${id}`} className="btn btn-primary">
            <i className="fas fa-plus"></i> Add Service
          </Link>
          <div className="share-link">
            <p>Share your registry:</p>
            <div className="link-container">
              <input 
                type="text" 
                value={`${window.location.origin}/registry/${registry.urlSlug}`}
                readOnly
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/registry/${registry.urlSlug}`);
                  toast.info('Link copied to clipboard');
                }}
                className="btn btn-light btn-sm"
              >
                <i className="fas fa-copy"></i> Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="services-container">
        <h2>Services</h2>
        {services.length === 0 ? (
          <p>No services added yet. Add a service to get started!</p>
        ) : (
          services.map(service => (
            <ServiceItem key={service._id} service={service} />
          ))
        )}
      </div>
    </div>
  );
};

export default ViewRegistry;