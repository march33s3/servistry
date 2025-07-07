import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

    return (
    <div className="home-container">
      <div className="home-content">
        {isAuthenticated ? (
          // Personalized content for logged-in users
          <>
            <h1>Welcome back, {user?.firstName}! </h1>
            <p className="lead">
              Ready to manage your registries or create a new one?
            </p>
            <div className="home-buttons">
              <Link to="/dashboard" className="btn btn-primary">
                <i className="fas fa-tachometer-alt"></i> Go to Dashboard
              </Link>
              <Link to="/create-registry" className="btn btn-secondary">
                <i className="fas fa-plus"></i> Create New Registry
              </Link>
            </div>
            
          </>
        ) : (
          // Original content for guest users
          <>
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
          </>
        )}
      </div>

      {/* Features section - show for all users */}
      <div className="home-features">
        <div className="feature">
          <i className="fas fa-clipboard-list"></i>
          <h3>Create</h3>
          <p>Build a registry for the services you truly need.</p>
          
        </div>
        <div className="feature">
          <i className="fas fa-share-alt"></i>
          <h3>Share</h3>
          <p>Invite friends and family to contribute with ease.</p>
          
        </div>
        <div className="feature">
          <i className="fas fa-credit-card"></i>
          <h3>Enjoy</h3>
          <p>Feel the difference service-based support makes.</p>
        </div>
      </div>

      {/* How It Works Section - show for all users */}
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

      {/* Testimonials Section - keep for all users */}
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

      {/* CTA Section - different for authenticated vs guest users */}
      <div style={{
        marginTop: '4rem',
        background: 'linear-gradient(135deg, var(--color-bg-mint), #dff0ed)',
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        border: '1px solid var(--color-border)'
      }}>
        {isAuthenticated ? (
          <>
            <h2 style={{ 
              marginBottom: '1rem',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text-primary)'
            }}>
              Ready to Create Another Registry?
            </h2>
            <p style={{ 
              fontSize: '1.125rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}>
              Continue helping your family and friends support you with the services you need most.
            </p>
            <Link to="/create-registry" className="btn btn-primary" style={{ 
              fontSize: '1.125rem',
              padding: '1rem 2rem'
            }}>
              <i className="fas fa-plus"></i> Create New Registry
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
        <div style={{ 
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)'
        }}>
          {isAuthenticated ? 
            'Always free • Secure & private • Trusted platform' : 
            'No credit card required • Free to start • Secure & private'
          }
        </div>
      </div>
    </div>
  );
};

export default Home;