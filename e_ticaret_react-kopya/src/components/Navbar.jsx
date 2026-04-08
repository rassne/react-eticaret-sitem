import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, userDropdownOpen, setUserDropdownOpen } = useUser();
  const { getCartCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getInitials = (fullName) => {
    return fullName?.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    logoutUser();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const handleOrders = (e) => {
    e.preventDefault();
    navigate('/orders');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MAĞAZA
      </Link>

      <div className="navbar-center">
        <Link to="/" className="nav-link">
          Anasayfa
        </Link>

        <div className="nav-item">
          <div
            className="nav-link"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Ürünler
            <i className="fas fa-chevron-down" style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}></i>
            <div className={`products-dropdown ${isDropdownOpen ? 'active' : ''}`}>
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className="product-item-emoji">{product.emoji}</span>
                  <span className="product-item-name">{product.name}</span>
                  <span className="product-item-price">{product.price} ₺</span>
                </Link>
              ))}
              <div className="dropdown-divider"></div>
              <Link to="/products" className="dropdown-link-all" onClick={() => setIsDropdownOpen(false)}>
                Tümünü Gör
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <Link to="/cart" className="nav-link">
          Sepet
        </Link>

        <Link to="/about" className="nav-link">
          Hakkımızda
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-badge">
          <i className="fas fa-shopping-cart cart-icon"></i>
          <span className="badge-count">{getCartCount()}</span>
        </Link>

        <div className="user-account"
          onMouseEnter={() => setUserDropdownOpen(true)}
          onMouseLeave={() => setUserDropdownOpen(false)}
        >
          {!user ? (
            <button className="login-btn" onClick={() => navigate('/login')}>
              <i className="fas fa-sign-in-alt"></i> Giriş Yap
            </button>
          ) : (
            <>
              <div className="user-info">
                <div className="user-avatar">{getInitials(user.fullName)}</div>
                <span>{user.fullName}</span>
                <i className="fas fa-chevron-down" style={{ fontSize: '0.8rem' }}></i>
              </div>
              <div className={`user-dropdown ${userDropdownOpen ? 'active' : ''}`}>
                <a href="#" onClick={handleProfile}>
                  <i className="fas fa-user"></i> Profilim
                </a>
                <a href="#" onClick={handleOrders}>
                  <i className="fas fa-box"></i> Siparişlerim
                </a>
                <a href="#" onClick={() => navigate('/settings')}>
                  <i className="fas fa-cog"></i> Ayarlar
                </a>
                <a href="#" onClick={handleLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Çıkış Yap
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
