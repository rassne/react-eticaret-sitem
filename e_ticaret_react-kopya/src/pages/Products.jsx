import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import '../styles/product.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Ürünleri localStorage'dan oku
    const storedProducts = JSON.parse(localStorage.getItem("urunler") || "[]");
    setProducts(storedProducts);
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Tüm Ürünler</h1>

          <div style={{
            maxWidth: '500px',
            margin: '0 auto 2rem',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Ürün ara... (örn: Akıllı, Mouse)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                fontSize: '1rem',
                paddingLeft: '2.5rem',
                boxSizing: 'border-box'
              }}
            />
            <i className="fas fa-search" style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gray)'
            }}></i>
          </div>

          <ProductGrid products={products} searchQuery={searchQuery} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Products;
