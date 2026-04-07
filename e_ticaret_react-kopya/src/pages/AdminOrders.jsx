import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import '../styles/admin-products.css';

const AdminOrders = () => {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'shipped', 'delivered'
  const [toast, setToast] = useState(null);

  // Check admin access
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Load orders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('allOrders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('allOrders', JSON.stringify(updatedOrders));
    showToast('✓ Sipariş durumu güncellendi!');
  };

  // Delete order
  const deleteOrder = (orderId) => {
    if (window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('allOrders', JSON.stringify(updatedOrders));
      showToast('✓ Sipariş silindi!');
    }
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Beklemede', color: '#f39c12', bg: '#fef5e7' };
      case 'processing':
        return { label: 'İşleniyor', color: '#3498db', bg: '#ebf5fb' };
      case 'shipped':
        return { label: 'Kargoda', color: '#9b59b6', bg: '#f5eef8' };
      case 'delivered':
        return { label: 'Teslim Edildi', color: '#27ae60', bg: '#e8f8f0' };
      case 'cancelled':
        return { label: 'İptal Edildi', color: '#e74c3c', bg: '#fdeaea' };
      default:
        return { label: 'Bilinmiyor', color: '#95a5a6', bg: '#f4f6f6' };
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const shippedOrders = orders.filter(o => o.status === 'shipped').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

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

          <h1 className="section-title">Sipariş Yönetimi</h1>

          {/* Toast Messages */}
          {toast && (
            <div className={`admin-toast admin-toast-${toast.type}`}>
              {toast.message}
            </div>
          )}

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{totalOrders}</div>
              <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Toplam Sipariş</div>
            </div>

            <div style={{
              background: '#fef5e7',
              border: '1px solid #f39c12',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#f39c12', marginBottom: '0.5rem' }}>
                <i className="fas fa-clock"></i>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f39c12' }}>{pendingOrders}</div>
              <div style={{ color: '#d68910', fontSize: '0.9rem' }}>Bekleyen</div>
            </div>

            <div style={{
              background: '#f5eef8',
              border: '1px solid #9b59b6',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#9b59b6', marginBottom: '0.5rem' }}>
                <i className="fas fa-truck"></i>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#9b59b6' }}>{shippedOrders}</div>
              <div style={{ color: '#7d3c98', fontSize: '0.9rem' }}>Kargoda</div>
            </div>

            <div style={{
              background: '#e8f8f0',
              border: '1px solid #27ae60',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#27ae60', marginBottom: '0.5rem' }}>
                <i className="fas fa-check-circle"></i>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#27ae60' }}>{deliveredOrders}</div>
              <div style={{ color: '#1e8449', fontSize: '0.9rem' }}>Teslim Edildi</div>
            </div>

            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                <i className="fas fa-coins"></i>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--gold)' }}>
                {totalRevenue.toLocaleString('tr-TR')} ₺
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Toplam Gelir</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '0.5rem 1rem',
                background: filter === 'all' ? 'var(--text)' : 'var(--light-gray)',
                color: filter === 'all' ? 'var(--white)' : 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Tümü ({totalOrders})
            </button>
            <button
              onClick={() => setFilter('pending')}
              style={{
                padding: '0.5rem 1rem',
                background: filter === 'pending' ? '#f39c12' : 'var(--light-gray)',
                color: filter === 'pending' ? 'var(--white)' : 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Bekleyen ({pendingOrders})
            </button>
            <button
              onClick={() => setFilter('shipped')}
              style={{
                padding: '0.5rem 1rem',
                background: filter === 'shipped' ? '#9b59b6' : 'var(--light-gray)',
                color: filter === 'shipped' ? 'var(--white)' : 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Kargoda ({shippedOrders})
            </button>
            <button
              onClick={() => setFilter('delivered')}
              style={{
                padding: '0.5rem 1rem',
                background: filter === 'delivered' ? '#27ae60' : 'var(--light-gray)',
                color: filter === 'delivered' ? 'var(--white)' : 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Teslim Edildi ({deliveredOrders})
            </button>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--gray)'
            }}>
              <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <p>Bu filtreyle eşleşen sipariş bulunamadı</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredOrders.map((order) => {
                const status = getStatusStyle(order.status);
                return (
                  <div
                    key={order.id}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {/* Order Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                          Sipariş #{order.id}
                        </div>
                        <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                          <i className="fas fa-calendar"></i> {order.date}
                        </div>
                      </div>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: status.bg,
                        color: status.color,
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {status.label}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div style={{
                      background: 'var(--light-gray)',
                      padding: '1rem',
                      borderRadius: '6px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                        <i className="fas fa-user"></i> {order.customer?.fullName || 'Misafir Kullanıcı'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                        <i className="fas fa-envelope"></i> {order.customer?.email || '-'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                        <i className="fas fa-phone"></i> {order.customer?.phone || '-'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                        <i className="fas fa-map-marker-alt"></i> {order.customer?.address || '-'}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Ürünler:</div>
                      {order.items?.map((item, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0',
                          borderBottom: '1px solid var(--border)',
                          fontSize: '0.9rem'
                        }}>
                          <span>{item.emoji || '📦'} {item.name} x {item.quantity}</span>
                          <span style={{ fontWeight: '600' }}>{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Total & Actions */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      paddingTop: '1rem',
                      borderTop: '2px solid var(--border)'
                    }}>
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--gold)'
                      }}>
                        Toplam: {order.total?.toLocaleString('tr-TR')} ₺
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            background: 'var(--white)'
                          }}
                        >
                          <option value="pending">Beklemede</option>
                          <option value="processing">İşleniyor</option>
                          <option value="shipped">Kargoda</option>
                          <option value="delivered">Teslim Edildi</option>
                          <option value="cancelled">İptal Edildi</option>
                        </select>

                        <button
                          onClick={() => deleteOrder(order.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fas fa-trash"></i> Sil
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminOrders;
