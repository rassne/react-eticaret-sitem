import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Footer from '../components/Footer';

const Orders = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const lastOrder = localStorage.getItem('lastOrder');
  const order = lastOrder ? JSON.parse(lastOrder) : null;

  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="section-title">Siparişlerim</h1>

          {!order ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'var(--light-gray)',
              borderRadius: '8px'
            }}>
              <i className="fas fa-box" style={{
                fontSize: '3rem',
                color: 'var(--gray)',
                marginBottom: '1rem',
                display: 'block'
              }}></i>
              <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                Henüz hiçbir siparişiniz yok
              </p>
              <button
                onClick={() => navigate('/products')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--text)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>En Son Siparişiniz</h3>
              <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
                <i className="fas fa-calendar"></i> {order.date}
              </p>

              <div style={{
                background: 'var(--light-gray)',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                {order.items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <span>{item.emoji} {item.name} x {item.quantity}</span>
                    <span>{item.price * item.quantity} ₺</span>
                  </div>
                ))}
              </div>

              <div style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: 'var(--gold)',
                marginBottom: '1.5rem'
              }}>
                Toplam: {order.total} ₺
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
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Orders;
