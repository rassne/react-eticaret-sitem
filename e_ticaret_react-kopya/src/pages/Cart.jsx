import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 className="section-title">Alışveriş Sepeti</h1>

          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'var(--light-gray)',
              borderRadius: '8px'
            }}>
              <i className="fas fa-shopping-cart" style={{
                fontSize: '3rem',
                color: 'var(--gray)',
                marginBottom: '1rem',
                display: 'block'
              }}></i>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>
                Sepetiniz boş
              </p>
              <Link to="/products" style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'var(--text)',
                color: 'var(--white)',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <>
              <div style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Ürün</th>
                      <th style={{ padding: '1rem', textAlign: 'center' }}>Fiyat</th>
                      <th style={{ padding: '1rem', textAlign: 'center' }}>Adet</th>
                      <th style={{ padding: '1rem', textAlign: 'center' }}>Toplam</th>
                      <th style={{ padding: '1rem', textAlign: 'center' }}>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
                            <div>{item.name}</div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          {item.price} ₺
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            width: 'fit-content',
                            margin: '0 auto'
                          }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.25rem 0.5rem',
                                cursor: 'pointer'
                              }}
                            >
                              −
                            </button>
                            <span style={{ minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.25rem 0.5rem',
                                cursor: 'pointer'
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>
                          {item.price * item.quantity} ₺
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: '#f44336',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
              }}>
                <div>
                  <Link to="/products" style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--light-gray)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}>
                    ← Alışverişe Devam Et
                  </Link>
                </div>

                <div style={{
                  textAlign: 'right',
                  padding: '1.5rem',
                  background: 'var(--light-gray)',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    Ürünler Toplamı: <strong>{getTotalPrice()} ₺</strong>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>
                    Kargo: Ücretsiz
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: 'var(--gold)',
                    marginBottom: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)'
                  }}>
                    Toplam: {getTotalPrice()} ₺
                  </div>

                  <Link to="/payment" style={{
                    display: 'inline-block',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--text)',
                    color: 'var(--white)',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    textAlign: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <i className="fas fa-credit-card"></i> Ödemeye Geç
                  </Link>

                  <button
                    onClick={() => {
                      if (confirm('Sepeti boşlamak istediğinize emin misiniz?')) {
                        clearCart();
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-trash"></i> Sepeti Boşalt
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;
