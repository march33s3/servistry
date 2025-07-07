import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Servistry</h1>
        <p className="lead">
          The trusted platform for service-based registries. Get the help you really need from the people who care about you.
        </p>
        <div className="home-buttons">
          <Link to="/register" className="btn btn-primary">
            <i className="fas fa-rocket"></i> Create Your Registry
          </Link>
          <Link to="/login" className="btn btn-secondary">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)'
        }}>
          <span>
            <i className="fas fa-shield-alt" style={{ color: 'var(--color-success)', marginRight: '0.5rem' }}></i>
            Secure & Trusted
          </span>
          <span>
            <i className="fas fa-users" style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}></i>
            Thousands of Users
          </span>
          <span>
            <i className="fas fa-lock" style={{ color: 'var(--color-success)', marginRight: '0.5rem' }}></i>
            Privacy Protected
          </span>
        </div>
      </div>

      <div className="home-features">
        <div className="feature">
          <i className="fas fa-clipboard-list"></i>
          <h3>Create Service Registries</h3>
          <p>Build registries for services you actually need - from house cleaning to meal delivery, tutoring to pet care.</p>
        </div>
        <div className="feature">
          <i className="fas fa-share-alt"></i>
          <h3>Share Securely</h3>
          <p>Share your registry with a simple, secure link. Friends and family can contribute safely through our trusted platform.</p>
        </div>
        <div className="feature">
          <i className="fas fa-credit-card"></i>
          <h3>Protected Payments</h3>
          <p>All contributions are processed through Stripe's bank-level security. Your financial information is never stored.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ 
        marginTop: '4rem',
        background: 'var(--color-white)',
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)'
        }}>
          How Servistry Works
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--color-gold)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              1
            </div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              Create Your Registry
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
              Set up your account and create a registry for any life event or need.
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--color-gold)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              2
            </div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              Add Services You Need
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
              Add specific services with links, descriptions, and funding goals.
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--color-gold)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              3
            </div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              Share & Receive
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
              Share your registry link and receive contributions from loved ones.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)'
        }}>
          Trusted by Families Everywhere
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div className="feature">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--color-bg-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--color-grey)'
              }}>
                SM
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                  Sarah M.
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  New Mom
                </div>
              </div>
            </div>
            <p style={{ 
              fontStyle: 'italic', 
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6'
            }}>
              "After our baby was born, friends asked how they could help. Servistry let us request meal delivery and house cleaning instead of more baby clothes. It was exactly what we needed."
            </p>
          </div>
          
          <div className="feature">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--color-bg-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--color-grey)'
              }}>
                MJ
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                  Michael J.
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  Recent Graduate
                </div>
              </div>
            </div>
            <p style={{ 
              fontStyle: 'italic', 
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6'
            }}>
              "Moving across the country for my first job was expensive. My family contributed to moving services and apartment setup through Servistry. So much more helpful than gift cards!"
            </p>
          </div>
          
          <div className="feature">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--color-bg-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--color-grey)'
              }}>
                LT
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                  Lisa T.
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  Family Caregiver
                </div>
              </div>
            </div>
            <p style={{ 
              fontStyle: 'italic', 
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6'
            }}>
              "When Dad got sick, we needed help with yard work and grocery delivery. Servistry made it easy for relatives to chip in for the services we actually needed during a difficult time."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        marginTop: '4rem',
        background: 'linear-gradient(135deg, var(--color-bg-mint), #dff0ed)',
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        border: '1px solid var(--color-border)'
      }}>
        <h2 style={{ 
          marginBottom: '1rem',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)'
        }}>
          Ready to Get Started?
        </h2>
        <p style={{ 
          fontSize: '1.125rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '2rem',
          maxWidth: '500px',
          margin: '0 auto 2rem'
        }}>
          Join thousands of families who've discovered a better way to ask for and give meaningful help.
        </p>
        <Link to="/register" className="btn btn-primary" style={{ 
          fontSize: '1.125rem',
          padding: '1rem 2rem'
        }}>
          <i className="fas fa-rocket"></i> Create Your Free Registry
        </Link>
        <div style={{ 
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)'
        }}>
          No credit card required • Free to start • Secure & private
        </div>
      </div>
    </div>
  );
};

export default Home;