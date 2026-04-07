import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

const Admin = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);

  // Admin kontrolü — isAdmin state'ine bakılır
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Load product count from localStorage
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("urunler") || "[]");
    setProductCount(products.length);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Yönetici Paneli</h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-box"></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Ürünleri Yönet</h3>
              <p style={{ color: 'var(--gray)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Ürün ekleyin, düzenleyin veya silin
              </p>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Toplam Ürün: {productCount}
              </div>
              <button 
                onClick={() => navigate('/admin/products')}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  background: 'var(--text)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                Yönet
              </button>
            </div>

            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Siparişleri Yönet</h3>
              <p style={{ color: 'var(--gray)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Siparişleri görüntüleyin ve kargo durumunu güncelleyin
              </p>
              <button style={{
                width: '100%',
                padding: '0.6rem',
                background: 'var(--text)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Yönet
              </button>
            </div>

            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-users"></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Kullanıcıları Yönet</h3>
              <p style={{ color: 'var(--gray)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Kullanıcı hesaplarını yönetin ve izinleri ayarlayın
              </p>
              <button style={{
                width: '100%',
                padding: '0.6rem',
                background: 'var(--text)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Yönet
              </button>
            </div>

            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>İstatistikler</h3>
              <p style={{ color: 'var(--gray)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Satış ve ziyaretçi istatistiklerini görüntüleyin
              </p>
              <button style={{
                width: '100%',
                padding: '0.6rem',
                background: 'var(--text)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Görüntüle
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--light-gray)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Ana Sayfaya Dön
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#e74c3c',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Çıkış
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Admin;
