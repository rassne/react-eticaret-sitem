import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import '../styles/admin-products.css';

const AdminProducts = () => {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check admin access
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Form state
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [imageTab, setImageTab] = useState('url'); // 'url' or 'file'
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBroken, setImageBroken] = useState(false);

  const [form, setForm] = useState({
    name: '',
    shortDesc: '',
    longDesc: '',
    price: '',
    category: 'Elektronik',
    stock: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  // Load products from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('urunler');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url.trim()) {
      setImagePreview(url);
      setImageBroken(false);
    } else {
      setImagePreview('');
      setImageBroken(false);
    }
  };

  // Handle image file upload
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result;
        setImagePreview(base64);
        setImageUrl('');
        setImageBroken(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-active');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-active');
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        setImagePreview(base64);
        setImageUrl('');
        setImageBroken(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Ürün adı zorunludur';
    }
    if (!form.shortDesc.trim()) {
      newErrors.shortDesc = 'Kısa açıklama zorunludur';
    }
    if (!form.longDesc.trim()) {
      newErrors.longDesc = 'Uzun açıklama zorunludur';
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      newErrors.price = 'Fiyat 0dan büyük olmalıdır';
    }
    if (form.stock === '' || parseInt(form.stock) < 0) {
      newErrors.stock = 'Stok 0 veya daha büyük olmalıdır';
    }
    if (!imagePreview) {
      newErrors.image = 'Ürün görseli zorunludur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare image data
    let finalImage = imagePreview;
    if (imageTab === 'url' && imageUrl) {
      finalImage = imageUrl;
    }

    if (formMode === 'add') {
      // Add new product
      const newProduct = {
        id: Date.now(),
        name: form.name,
        shortDesc: form.shortDesc,
        longDesc: form.longDesc,
        price: parseFloat(form.price),
        category: form.category,
        stock: parseInt(form.stock),
        image: finalImage,
        rating: 5,
        createdAt: new Date().toISOString(),
        description: form.shortDesc,
        detailedDescription: form.longDesc
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('urunler', JSON.stringify(updatedProducts));
      showToast('✓ Ürün eklendi!');
      resetForm();
    } else if (formMode === 'edit') {
      // Update existing product
      const updatedProducts = products.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            name: form.name,
            shortDesc: form.shortDesc,
            longDesc: form.longDesc,
            price: parseFloat(form.price),
            category: form.category,
            stock: parseInt(form.stock),
            image: finalImage,
            description: form.shortDesc,
            detailedDescription: form.longDesc
          };
        }
        return p;
      });

      setProducts(updatedProducts);
      localStorage.setItem('urunler', JSON.stringify(updatedProducts));
      showToast('✓ Ürün güncellendi!');
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: '',
      shortDesc: '',
      longDesc: '',
      price: '',
      category: 'Elektronik',
      stock: '',
      image: ''
    });
    setImageUrl('');
    setImagePreview('');
    setImageBroken(false);
    setImageTab('url');
    setErrors({});
    setFormMode('add');
    setEditingId(null);
  };

  // Load product into form for editing
  const handleEdit = (product) => {
    setFormMode('edit');
    setEditingId(product.id);
    setForm({
      name: product.name,
      shortDesc: product.shortDesc,
      longDesc: product.longDesc,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image
    });
    setImagePreview(product.image);
    if (product.image.startsWith('http')) {
      setImageUrl(product.image);
      setImageTab('url');
    } else {
      setImageTab('file');
    }
    setErrors({});
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete product with confirmation
  const handleDelete = (id, productName) => {
    if (window.confirm(`Bu ürünü silmek istediğinize emin misiniz?`)) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('urunler', JSON.stringify(updatedProducts));
      showToast('✓ Ürün silindi!');
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--gray)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ← Yönetici Paneline Dön
            </button>
          </div>

          <h1 className="section-title">Ürün Yönetimi</h1>

          {/* Toast Messages */}
          {toast && (
            <div className={`admin-toast admin-toast-${toast.type}`}>
              {toast.message}
            </div>
          )}

          <div className="admin-products-container">
            {/* Left Column - Form */}
            <div className="admin-products-form-column">
              <h2 style={{ marginBottom: '1.5rem' }}>
                {formMode === 'add' ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}
              </h2>

              <form onSubmit={handleSubmit} className="admin-product-form">
                {/* Image Upload Section */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Ürün Görseli
                  </label>

                  <div className="image-tab-buttons">
                    <button
                      type="button"
                      className={`tab-btn ${imageTab === 'url' ? 'active' : ''}`}
                      onClick={() => setImageTab('url')}
                    >
                      URL ile Ekle
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${imageTab === 'file' ? 'active' : ''}`}
                      onClick={() => setImageTab('file')}
                    >
                      Bilgisayardan Yükle
                    </button>
                  </div>

                  {imageTab === 'url' && (
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      placeholder="Resim URL'sini yapıştırın..."
                      onError={() => setImageBroken(true)}
                      className="form-input"
                      style={{ marginTop: '0.75rem' }}
                    />
                  )}

                  {imageTab === 'file' && (
                    <div
                      className="file-drop-zone"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="file-input"
                        id="image-file"
                      />
                      <label htmlFor="image-file" className="file-label">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Resmi buraya sürükleyin veya tıklayın</p>
                      </label>
                    </div>
                  )}

                  {/* Image Preview */}
                  <div className="image-preview-box">
                    {imagePreview && !imageBroken ? (
                      <img src={imagePreview} alt="Önizleme" onError={() => setImageBroken(true)} />
                    ) : (
                      <div className="image-preview-empty">
                        <i className="fas fa-image"></i>
                        <p>Görsel önizleme</p>
                      </div>
                    )}
                  </div>

                  {errors.image && <span className="form-error">{errors.image}</span>}
                </div>

                {/* Product Name */}
                <div className="form-group">
                  <label>Ürün Adı</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      maxLength="60"
                      placeholder="Ürün adı"
                      className="form-input"
                    />
                    <span className="char-counter">{form.name.length}/60</span>
                  </div>
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Short Description */}
                <div className="form-group">
                  <label>Kısa Açıklama</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="shortDesc"
                      value={form.shortDesc}
                      onChange={handleFormChange}
                      maxLength="120"
                      placeholder="Kısa açıklama"
                      className="form-input"
                    />
                    <span className="char-counter">{form.shortDesc.length}/120</span>
                  </div>
                  {errors.shortDesc && <span className="form-error">{errors.shortDesc}</span>}
                </div>

                {/* Long Description */}
                <div className="form-group">
                  <label>Uzun Açıklama</label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      name="longDesc"
                      value={form.longDesc}
                      onChange={handleFormChange}
                      maxLength="500"
                      placeholder="Uzun açıklama"
                      className="form-input form-textarea"
                      rows="5"
                    />
                    <span className="char-counter">{form.longDesc.length}/500</span>
                  </div>
                  {errors.longDesc && <span className="form-error">{errors.longDesc}</span>}
                </div>

                {/* Price */}
                <div className="form-group">
                  <label>Fiyat</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--gray)',
                      fontWeight: '600'
                    }}>
                      ₺
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleFormChange}
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      className="form-input"
                      style={{ paddingLeft: '2rem' }}
                    />
                  </div>
                  {errors.price && <span className="form-error">{errors.price}</span>}
                </div>

                {/* Category */}
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="form-input form-select"
                  >
                    <option value="Elektronik">Elektronik</option>
                    <option value="Giyim">Giyim</option>
                    <option value="Ev & Yaşam">Ev & Yaşam</option>
                    <option value="Spor">Spor</option>
                    <option value="Kitap">Kitap</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                {/* Stock */}
                <div className="form-group">
                  <label>Stok Adedi</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleFormChange}
                    min="0"
                    placeholder="0"
                    className="form-input"
                  />
                  {errors.stock && <span className="form-error">{errors.stock}</span>}
                </div>

                {/* Form Buttons */}
                <div className="form-buttons">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    <i className={`fas fa-${formMode === 'add' ? 'plus' : 'save'}`}></i>
                    {formMode === 'add' ? 'Ürünü Ekle' : 'Güncelle'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={formMode === 'add' ? resetForm : handleCancelEdit}
                    style={{ flex: 1 }}
                  >
                    <i className={`fas fa-${formMode === 'add' ? 'eraser' : 'times'}`}></i>
                    {formMode === 'add' ? 'Temizle' : 'İptal'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Products List */}
            <div className="admin-products-list-column">
              <h2 style={{ marginBottom: '1.5rem' }}>
                Ürünler ({products.length})
              </h2>

              {products.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'var(--light-gray)',
                  borderRadius: '8px',
                  color: 'var(--gray)'
                }}>
                  <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                  <p>Henüz ürün eklenmemiş</p>
                </div>
              ) : (
                <div className="admin-products-grid">
                  {products.map((product) => (
                    <div key={product.id} className="admin-product-card">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="admin-product-image"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />

                      <div className="admin-product-info">
                        <h4>{product.name}</h4>
                        <p className="product-price">{product.price.toLocaleString('tr-TR')} ₺</p>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span className="product-category">{product.category}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>
                            Stok: {product.stock}
                          </span>
                        </div>
                      </div>

                      <div className="admin-product-actions">
                        <button
                          onClick={() => handleEdit(product)}
                          className="btn-action btn-edit"
                          title="Düzenle"
                        >
                          <i className="fas fa-edit"></i> Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="btn-action btn-delete"
                          title="Sil"
                        >
                          <i className="fas fa-trash"></i> Sil
                        </button>
                      </div>
                    </div>
                  ))}
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

export default AdminProducts;
