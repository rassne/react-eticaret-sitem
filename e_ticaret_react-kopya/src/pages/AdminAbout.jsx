import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import { getTrustData, saveTrustData } from '../data/trustData';
import '../styles/admin-about.css';

const AdminAbout = () => {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check admin access
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // State
  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews', 'collaborations', 'awards'
  const [trustData, setTrustData] = useState({ reviews: [], collaborations: [], awards: [] });
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Form states for each section
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 5,
    review: '',
    date: new Date().toISOString().split('T')[0],
    avatar: ''
  });

  const [collabForm, setCollabForm] = useState({
    companyName: '',
    logo: '',
    description: ''
  });

  const [awardForm, setAwardForm] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  // Load trust data on mount
  useEffect(() => {
    const data = getTrustData();
    setTrustData(data);
  }, []);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Reset forms
  const resetForms = () => {
    setReviewForm({
      customerName: '',
      rating: 5,
      review: '',
      date: new Date().toISOString().split('T')[0],
      avatar: ''
    });
    setCollabForm({
      companyName: '',
      logo: '',
      description: ''
    });
    setAwardForm({
      title: '',
      year: new Date().getFullYear(),
      description: '',
      image: ''
    });
    setErrors({});
    setFormMode('add');
    setEditingId(null);
  };

  // Validate forms
  const validateReviewForm = () => {
    const newErrors = {};
    if (!reviewForm.customerName.trim()) newErrors.customerName = 'Müşteri adı zorunludur';
    if (!reviewForm.review.trim()) newErrors.review = 'Yorum metni zorunludur';
    if (reviewForm.rating < 1 || reviewForm.rating > 5) newErrors.rating = 'Puan 1-5 arası olmalıdır';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCollabForm = () => {
    const newErrors = {};
    if (!collabForm.companyName.trim()) newErrors.companyName = 'Şirket adı zorunludur';
    if (!collabForm.description.trim()) newErrors.description = 'Açıklama zorunludur';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAwardForm = () => {
    const newErrors = {};
    if (!awardForm.title.trim()) newErrors.title = 'Ödül adı zorunludur';
    if (!awardForm.description.trim()) newErrors.description = 'Açıklama zorunludur';
    if (!awardForm.year || awardForm.year < 2000 || awardForm.year > 2100) {
      newErrors.year = 'Geçerli bir yıl giriniz';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!validateReviewForm()) return;

    const newData = { ...trustData };
    
    if (formMode === 'add') {
      const newReview = {
        id: Date.now(),
        ...reviewForm,
        avatar: reviewForm.avatar || `https://via.placeholder.com/60x60?text=${reviewForm.customerName.charAt(0)}`
      };
      newData.reviews = [...newData.reviews, newReview];
      showToast('✓ Yorum eklendi!');
    } else {
      newData.reviews = newData.reviews.map(r => 
        r.id === editingId ? { ...r, ...reviewForm } : r
      );
      showToast('✓ Yorum güncellendi!');
    }

    setTrustData(newData);
    saveTrustData(newData);
    resetForms();
  };

  // Handle Collaboration Submit
  const handleCollabSubmit = (e) => {
    e.preventDefault();
    if (!validateCollabForm()) return;

    const newData = { ...trustData };
    
    if (formMode === 'add') {
      const newCollab = {
        id: Date.now(),
        ...collabForm,
        logo: collabForm.logo || `https://via.placeholder.com/120x60?text=${collabForm.companyName}`
      };
      newData.collaborations = [...newData.collaborations, newCollab];
      showToast('✓ İş birliği eklendi!');
    } else {
      newData.collaborations = newData.collaborations.map(c => 
        c.id === editingId ? { ...c, ...collabForm } : c
      );
      showToast('✓ İş birliği güncellendi!');
    }

    setTrustData(newData);
    saveTrustData(newData);
    resetForms();
  };

  // Handle Award Submit
  const handleAwardSubmit = (e) => {
    e.preventDefault();
    if (!validateAwardForm()) return;

    const newData = { ...trustData };
    
    if (formMode === 'add') {
      const newAward = {
        id: Date.now(),
        ...awardForm,
        image: awardForm.image || 'https://via.placeholder.com/80x80?text=Award'
      };
      newData.awards = [...newData.awards, newAward];
      showToast('✓ Ödül eklendi!');
    } else {
      newData.awards = newData.awards.map(a => 
        a.id === editingId ? { ...a, ...awardForm } : a
      );
      showToast('✓ Ödül güncellendi!');
    }

    setTrustData(newData);
    saveTrustData(newData);
    resetForms();
  };

  // Edit handlers
  const handleEditReview = (review) => {
    setFormMode('edit');
    setEditingId(review.id);
    setReviewForm({
      customerName: review.customerName,
      rating: review.rating,
      review: review.review,
      date: review.date,
      avatar: review.avatar || ''
    });
    setActiveTab('reviews');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditCollab = (collab) => {
    setFormMode('edit');
    setEditingId(collab.id);
    setCollabForm({
      companyName: collab.companyName,
      logo: collab.logo || '',
      description: collab.description
    });
    setActiveTab('collaborations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditAward = (award) => {
    setFormMode('edit');
    setEditingId(award.id);
    setAwardForm({
      title: award.title,
      year: award.year,
      description: award.description,
      image: award.image || ''
    });
    setActiveTab('awards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete handlers
  const handleDeleteReview = (id) => {
    if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      const newData = { ...trustData };
      newData.reviews = newData.reviews.filter(r => r.id !== id);
      setTrustData(newData);
      saveTrustData(newData);
      showToast('✓ Yorum silindi!');
    }
  };

  const handleDeleteCollab = (id) => {
    if (window.confirm('Bu iş birliğini silmek istediğinize emin misiniz?')) {
      const newData = { ...trustData };
      newData.collaborations = newData.collaborations.filter(c => c.id !== id);
      setTrustData(newData);
      saveTrustData(newData);
      showToast('✓ İş birliği silindi!');
    }
  };

  const handleDeleteAward = (id) => {
    if (window.confirm('Bu ödülü silmek istediğinize emin misiniz?')) {
      const newData = { ...trustData };
      newData.awards = newData.awards.filter(a => a.id !== id);
      setTrustData(newData);
      saveTrustData(newData);
      showToast('✓ Ödül silindi!');
    }
  };

  // Render star selector
  const renderStarSelector = () => {
    return (
      <div className="star-selector">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            type="button"
            className={`star-btn ${reviewForm.rating >= num ? 'active' : ''}`}
            onClick={() => setReviewForm({ ...reviewForm, rating: num })}
          >
            <i className="fas fa-star"></i>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate('/admin')}
              className="back-btn"
            >
              ← Yönetici Paneline Dön
            </button>
          </div>

          <h1 className="section-title">Hakkımızda Yönetimi</h1>

          {/* Toast Messages */}
          {toast && (
            <div className={`admin-toast admin-toast-${toast.type}`}>
              {toast.message}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="admin-about-tabs">
            <button
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => { setActiveTab('reviews'); resetForms(); }}
            >
              <i className="fas fa-comments"></i>
              Müşteri Yorumları ({trustData.reviews.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'collaborations' ? 'active' : ''}`}
              onClick={() => { setActiveTab('collaborations'); resetForms(); }}
            >
              <i className="fas fa-handshake"></i>
              İş Birlikleri ({trustData.collaborations.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'awards' ? 'active' : ''}`}
              onClick={() => { setActiveTab('awards'); resetForms(); }}
            >
              <i className="fas fa-trophy"></i>
              Ödüller ({trustData.awards.length})
            </button>
          </div>

          <div className="admin-about-container">
            {/* Left Column - Form */}
            <div className="admin-about-form-column">
              <h2>
                {formMode === 'add' ? 'Yeni Ekle' : 'Düzenle'}
              </h2>

              {/* Reviews Form */}
              {activeTab === 'reviews' && (
                <form onSubmit={handleReviewSubmit} className="admin-about-form">
                  <div className="form-group">
                    <label>Müşteri Adı</label>
                    <input
                      type="text"
                      value={reviewForm.customerName}
                      onChange={(e) => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="form-input"
                    />
                    {errors.customerName && <span className="form-error">{errors.customerName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Puan</label>
                    {renderStarSelector()}
                    {errors.rating && <span className="form-error">{errors.rating}</span>}
                  </div>

                  <div className="form-group">
                    <label>Yorum</label>
                    <textarea
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      placeholder="Müşteri yorumu..."
                      className="form-input form-textarea"
                      rows="4"
                    />
                    {errors.review && <span className="form-error">{errors.review}</span>}
                  </div>

                  <div className="form-group">
                    <label>Tarih</label>
                    <input
                      type="date"
                      value={reviewForm.date}
                      onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Avatar URL (İsteğe bağlı)</label>
                    <input
                      type="text"
                      value={reviewForm.avatar}
                      onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                      className="form-input"
                    />
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                      <i className={`fas fa-${formMode === 'add' ? 'plus' : 'save'}`}></i>
                      {formMode === 'add' ? 'Ekle' : 'Güncelle'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetForms}>
                      <i className="fas fa-times"></i>
                      İptal
                    </button>
                  </div>
                </form>
              )}

              {/* Collaborations Form */}
              {activeTab === 'collaborations' && (
                <form onSubmit={handleCollabSubmit} className="admin-about-form">
                  <div className="form-group">
                    <label>Şirket Adı</label>
                    <input
                      type="text"
                      value={collabForm.companyName}
                      onChange={(e) => setCollabForm({ ...collabForm, companyName: e.target.value })}
                      placeholder="TechCorp"
                      className="form-input"
                    />
                    {errors.companyName && <span className="form-error">{errors.companyName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Logo URL (İsteğe bağlı)</label>
                    <input
                      type="text"
                      value={collabForm.logo}
                      onChange={(e) => setCollabForm({ ...collabForm, logo: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Açıklama</label>
                    <textarea
                      value={collabForm.description}
                      onChange={(e) => setCollabForm({ ...collabForm, description: e.target.value })}
                      placeholder="İş birliği detayları..."
                      className="form-input form-textarea"
                      rows="3"
                    />
                    {errors.description && <span className="form-error">{errors.description}</span>}
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                      <i className={`fas fa-${formMode === 'add' ? 'plus' : 'save'}`}></i>
                      {formMode === 'add' ? 'Ekle' : 'Güncelle'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetForms}>
                      <i className="fas fa-times"></i>
                      İptal
                    </button>
                  </div>
                </form>
              )}

              {/* Awards Form */}
              {activeTab === 'awards' && (
                <form onSubmit={handleAwardSubmit} className="admin-about-form">
                  <div className="form-group">
                    <label>Ödül Adı</label>
                    <input
                      type="text"
                      value={awardForm.title}
                      onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                      placeholder="En İyi E-Ticaret Sitesi"
                      className="form-input"
                    />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label>Yıl</label>
                    <input
                      type="number"
                      value={awardForm.year}
                      onChange={(e) => setAwardForm({ ...awardForm, year: parseInt(e.target.value) })}
                      min="2000"
                      max="2100"
                      className="form-input"
                    />
                    {errors.year && <span className="form-error">{errors.year}</span>}
                  </div>

                  <div className="form-group">
                    <label>Açıklama</label>
                    <textarea
                      value={awardForm.description}
                      onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                      placeholder="Ödül hakkında bilgi..."
                      className="form-input form-textarea"
                      rows="3"
                    />
                    {errors.description && <span className="form-error">{errors.description}</span>}
                  </div>

                  <div className="form-group">
                    <label>Görsel URL (İsteğe bağlı)</label>
                    <input
                      type="text"
                      value={awardForm.image}
                      onChange={(e) => setAwardForm({ ...awardForm, image: e.target.value })}
                      placeholder="https://example.com/award.png"
                      className="form-input"
                    />
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                      <i className={`fas fa-${formMode === 'add' ? 'plus' : 'save'}`}></i>
                      {formMode === 'add' ? 'Ekle' : 'Güncelle'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetForms}>
                      <i className="fas fa-times"></i>
                      İptal
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column - List */}
            <div className="admin-about-list-column">
              <h2>
                {activeTab === 'reviews' && `Yorumlar (${trustData.reviews.length})`}
                {activeTab === 'collaborations' && `İş Birlikleri (${trustData.collaborations.length})`}
                {activeTab === 'awards' && `Ödüller (${trustData.awards.length})`}
              </h2>

              {/* Reviews List */}
              {activeTab === 'reviews' && (
                <div className="admin-items-list">
                  {trustData.reviews.length === 0 ? (
                    <div className="empty-state">
                      <i className="fas fa-comments"></i>
                      <p>Henüz yorum eklenmemiş</p>
                    </div>
                  ) : (
                    trustData.reviews.map(review => (
                      <div key={review.id} className="admin-item-card">
                        <div className="item-content">
                          <div className="item-header">
                            <strong>{review.customerName}</strong>
                            <span className="item-stars">
                              {Array.from({ length: review.rating }, (_, i) => (
                                <i key={i} className="fas fa-star" style={{ color: '#f39c12' }}></i>
                              ))}
                            </span>
                          </div>
                          <p className="item-text">"{review.review}"</p>
                          <span className="item-date">{review.date}</span>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleEditReview(review)} className="btn-action btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button onClick={() => handleDeleteReview(review.id)} className="btn-action btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Collaborations List */}
              {activeTab === 'collaborations' && (
                <div className="admin-items-list">
                  {trustData.collaborations.length === 0 ? (
                    <div className="empty-state">
                      <i className="fas fa-handshake"></i>
                      <p>Henüz iş birliği eklenmemiş</p>
                    </div>
                  ) : (
                    trustData.collaborations.map(collab => (
                      <div key={collab.id} className="admin-item-card">
                        <div className="item-content">
                          <strong>{collab.companyName}</strong>
                          <p className="item-text">{collab.description}</p>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleEditCollab(collab)} className="btn-action btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button onClick={() => handleDeleteCollab(collab.id)} className="btn-action btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Awards List */}
              {activeTab === 'awards' && (
                <div className="admin-items-list">
                  {trustData.awards.length === 0 ? (
                    <div className="empty-state">
                      <i className="fas fa-trophy"></i>
                      <p>Henüz ödül eklenmemiş</p>
                    </div>
                  ) : (
                    trustData.awards.map(award => (
                      <div key={award.id} className="admin-item-card">
                        <div className="item-content">
                          <div className="item-header">
                            <strong>{award.title}</strong>
                            <span className="item-year">{award.year}</span>
                          </div>
                          <p className="item-text">{award.description}</p>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleEditAward(award)} className="btn-action btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button onClick={() => handleDeleteAward(award.id)} className="btn-action btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminAbout;
