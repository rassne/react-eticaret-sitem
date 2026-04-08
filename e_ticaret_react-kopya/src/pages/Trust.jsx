import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { getTrustData } from '../data/trustData';
import '../styles/trust.css';

const Trust = () => {
  const navigate = useNavigate();
  const [trustData, setTrustData] = useState({
    reviews: [],
    collaborations: [],
    awards: []
  });

  useEffect(() => {
    const data = getTrustData();
    setTrustData(data);
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fas fa-star ${i < rating ? 'star-filled' : 'star-empty'}`}
      />
    ));
  };

  return (
    <>
      <section className="section trust-page">
        <div className="container">
          <button
            onClick={() => navigate('/')}
            className="back-button"
          >
            ← Ana Sayfaya Dön
          </button>

          <h1 className="section-title">Güven ve Başarılarımız</h1>
          <p className="trust-intro">
            Müşterilerimizin güvenini kazanmak ve kaliteli hizmet sunmak en büyük önceliğimizdir. 
            İşte bizi öne çıkaran başarılarımız ve değerli müşterilerimizin görüşleri.
          </p>

          {/* Customer Reviews Section */}
          {trustData.reviews.length > 0 && (
            <div className="trust-section">
              <h2 className="trust-section-title">
                <i className="fas fa-comments"></i>
                Müşteri Yorumları
              </h2>
              <div className="reviews-grid">
                {trustData.reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <img 
                        src={review.avatar} 
                        alt={review.customerName}
                        className="review-avatar"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/60x60?text=User';
                        }}
                      />
                      <div className="review-info">
                        <h4 className="review-name">{review.customerName}</h4>
                        <div className="star-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="review-text">"{review.review}"</p>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collaborations Section */}
          {trustData.collaborations.length > 0 && (
            <div className="trust-section">
              <h2 className="trust-section-title">
                <i className="fas fa-handshake"></i>
                İş Birliklerimiz
              </h2>
              <div className="collaborations-grid">
                {trustData.collaborations.map((collab) => (
                  <div key={collab.id} className="collaboration-card">
                    <img 
                      src={collab.logo} 
                      alt={collab.companyName}
                      className="collaboration-logo"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/120x60?text=Logo';
                      }}
                    />
                    <h4 className="collaboration-name">{collab.companyName}</h4>
                    <p className="collaboration-desc">{collab.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards Section */}
          {trustData.awards.length > 0 && (
            <div className="trust-section">
              <h2 className="trust-section-title">
                <i className="fas fa-trophy"></i>
                Ödüllerimiz
              </h2>
              <div className="awards-grid">
                {trustData.awards.map((award) => (
                  <div key={award.id} className="award-card">
                    <img 
                      src={award.image} 
                      alt={award.title}
                      className="award-image"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Award';
                      }}
                    />
                    <div className="award-info">
                      <span className="award-year">{award.year}</span>
                      <h4 className="award-title">{award.title}</h4>
                      <p className="award-desc">{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {trustData.reviews.length === 0 && 
           trustData.collaborations.length === 0 && 
           trustData.awards.length === 0 && (
            <div className="trust-empty">
              <i className="fas fa-info-circle"></i>
              <p>Henüz içerik eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Trust;
