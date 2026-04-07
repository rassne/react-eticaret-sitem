import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
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
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">{product.price} ₺</div>
        <div className="product-actions">
          <button className="product-btn btn-add-cart" onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart"></i> Sepete Ekle
          </button>
          <Link to={`/product/${product.id}`} className="product-btn btn-view-details">
            Detaylar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
