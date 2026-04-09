import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>MAĞAZA</h3>
          <p>En kaliteli teknoloji ürünleri en uygun fiyatlarla</p>
        </div>
        
        <div className="footer-section">
          <h4>Hakkımızda</h4>
          <Link to="/trust" className="footer-link">
            <i className="fas fa-shield-alt"></i> Güven Rozetleri
          </Link>
          <Link to="/commitments" className="footer-link">
            <i className="fas fa-handshake"></i> Taahhütlerimiz
          </Link>
        </div>
      </div>
      
      <div className="copyright">
        &copy; 2026 MAĞAZA. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
