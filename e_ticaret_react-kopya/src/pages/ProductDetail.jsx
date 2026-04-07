import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Ürünleri localStorage'dan oku
    const products = JSON.parse(localStorage.getItem("urunler") || "[]");
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Ürün Bulunamadı</h2>
          <button
            onClick={() => navigate('/products')}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--text)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Ürünlere Dön
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'var(--light-gray)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              minHeight: '300px',
              overflow: 'hidden'
            }}>
              {product.emoji ? (
                product.emoji
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
              )}
            </div>

            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {product.name}
              </h1>
              <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--gold)',
                marginBottom: '1.5rem'
              }}>
                {product.price} ₺
              </div>

              <div style={{
                background: 'var(--light-gray)',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <p style={{ lineHeight: '1.8' }}>
                  {product.detailedDescription}
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '0.5rem'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      padding: '0 0.5rem'
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: '50px',
                      textAlign: 'center',
                      border: 'none',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      padding: '0 0.5rem'
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    background: 'var(--text)',
                    color: 'var(--white)',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--text)';
                  }}
                >
                  <i className="fas fa-shopping-cart"></i> Sepete Ekle
                </button>
              </div>

              {addedToCart && (
                <div style={{
                  background: '#4caf50',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  textAlign: 'center',
                  animation: 'slideDown 0.3s ease'
                }}>
                  ✓ Ürün sepete eklendi!
                </div>
              )}

              <button
                onClick={() => navigate('/products')}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--light-gray)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ← Ürünlere Dön
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ProductDetail;
