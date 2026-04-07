import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Footer from '../components/Footer';

const Profile = () => {
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
          <h1 className="section-title">Profilim</h1>

          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--gold)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '700',
                margin: '0 auto',
                marginBottom: '1rem'
              }}>
                {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <h2>{user.fullName}</h2>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Ad Soyad
              </label>
              <p>{user.fullName}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Kullanıcı Adı
              </label>
              <p>{user.username}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                E-posta
              </label>
              <p>{user.email}</p>
            </div>

            <button
              onClick={() => navigate('/')}
              style={{
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
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
