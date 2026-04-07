import React from 'react';
import { socialLinks } from '../data/products';

const SocialMedia = () => {
  return (
    <section className="section" style={{ background: 'var(--light-gray)' }}>
      <div className="container">
        <h2 className="section-title">Bizi Takip Edin</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {socialLinks.map(social => (
            <div
              key={social.id}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                <i className={social.icon} style={{ color: social.color }}></i>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {social.name}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '1rem' }}>
                {social.followers}
              </div>
              <button
                style={{
                  padding: '0.6rem 1.2rem',
                  background: 'var(--text)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--text)';
                }}
              >
                Takip Et
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
