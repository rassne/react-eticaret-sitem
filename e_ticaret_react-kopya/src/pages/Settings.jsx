import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Footer from '../components/Footer';

const Settings = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 className="section-title">Ayarlar</h1>

          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Hesap Ayarları</h3>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--light-gray)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}
              >
                <i className="fas fa-key"></i> Şifreyi Değiştir
              </button>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                Hesabınızın güvenliğını artırmak için şifrenizi düzenli olarak değiştirin.
              </p>
            </div>

            <div style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Bildirim Ayarları</h3>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                cursor: 'pointer'
              }}>
                <input type="checkbox" defaultChecked />
                E-posta ile bildirim gönder
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}>
                <input type="checkbox" defaultChecked />
                Promosyon ve özel teklifler hakkında bilgilendir
              </label>
            </div>

            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '2rem',
                width: '100%',
                padding: '0.75rem',
                background: 'var(--text)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Kaydet
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Settings;
