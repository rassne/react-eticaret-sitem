import React from 'react';
import ProductCard from './ProductCard';
import '../styles/product.css';

const ProductGrid = ({ products, searchQuery }) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#888880' }}>
          Arama kriterlerine uygun ürün bulunamadı.
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
