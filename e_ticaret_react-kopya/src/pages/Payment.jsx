import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import Footer from '../components/Footer';
import '../styles/auth.css';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cartItems.length === 0) {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Sepetiniz Boş</h2>
          <p style={{ marginBottom: '1.5rem' }}>Ödeme yapmak için sepetinize ürün eklemeniz gerekir.</p>
          <button
            onClick={() => navigate('/products')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--text)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Ürünlere Dön
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Ad soyad zorunludur';
    if (!formData.email) newErrors.email = 'E-posta zorunludur';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli e-posta girin';
    if (!formData.phone) newErrors.phone = 'Telefon zorunludur';
    if (!formData.address) newErrors.address = 'Adres zorunludur';
    if (!formData.cardName) newErrors.cardName = 'Kart sahibinin adı zorunludur';
    if (!formData.cardNumber) newErrors.cardNumber = 'Kart numarası zorunludur';
    else if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Geçerli kart numarası girin';
    if (!formData.expiry) newErrors.expiry = 'Son kullanma tarihi zorunludur';
    if (!formData.cvv) newErrors.cvv = 'CVV zorunludur';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new order
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: getTotalPrice(),
      date: new Date().toLocaleString('tr-TR'),
      status: 'pending',
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      }
    };

    // Save to allOrders list for admin panel
    const existingOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    existingOrders.unshift(newOrder);
    localStorage.setItem('allOrders', JSON.stringify(existingOrders));

    // Also save as lastOrder for user's order page
    localStorage.setItem('lastOrder', JSON.stringify({
      items: cartItems,
      total: getTotalPrice(),
      date: new Date().toLocaleString('tr-TR')
    }));

    // Simulate payment
    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <>
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            color: '#4caf50',
            marginBottom: '1rem'
          }}>
            ✓
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Siparişiniz Alındı!
          </h2>
          <p style={{ marginBottom: '2rem', color: 'var(--gray)' }}>
            Siparişiniz başarıyla tamamlanmıştır. Kargo takip numarasını e-posta adresinize gönderedik.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            Toplam Tutar: <strong style={{ color: 'var(--gold)' }}>{getTotalPrice()} ₺</strong>
          </p>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
            Anasayfaya yönlendiriliyorsunuz...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="auth-container" style={{ maxWidth: '900px', marginTop: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Ödeme Bilgileri</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Teslimat Bilgileri</h3>

            <form style={{ display: 'grid', gap: '1rem' }}>
              <div className="form-group">
                <label>Ad Soyad</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ad Soyad"
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-posta"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon Numarası"
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Adres</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Teslimat Adresi"
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    fontFamily: 'inherit'
                  }}
                ></textarea>
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>
            </form>
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem' }}>Kart Bilgileri</h3>

            <form style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div className="form-group">
                <label>Kart Sahibinin Adı</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="Kart Sahibinin Adı"
                />
                {errors.cardName && <span className="form-error">{errors.cardName}</span>}
              </div>

              <div className="form-group">
                <label>Kart Numarası</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '');
                    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                    setFormData(prev => ({
                      ...prev,
                      cardNumber: formatted
                    }));
                  }}
                  placeholder="0000 0000 0000 0000"
                />
                {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Son Kullanma Tarihi</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setFormData(prev => ({
                        ...prev,
                        expiry: value
                      }));
                    }}
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setFormData(prev => ({
                        ...prev,
                        cvv: value
                      }));
                    }}
                    placeholder="000"
                  />
                  {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                </div>
              </div>
            </form>

            <div style={{
              background: 'var(--light-gray)',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Sipariş Özeti</strong>
              </div>
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>{item.price * item.quantity} ₺</span>
                </div>
              ))}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1rem',
                marginTop: '1rem',
                fontWeight: '700',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Toplam:</span>
                <span style={{ color: 'var(--gold)' }}>{getTotalPrice()} ₺</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--text)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--text)';
              }}
            >
              <i className="fas fa-lock"></i> Ödeme Yap
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
