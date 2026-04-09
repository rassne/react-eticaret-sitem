import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/commitments.css';

const Commitments = () => {
  const navigate = useNavigate();

  const commitments = [
    {
      id: 1,
      icon: 'fas fa-shipping-fast',
      title: 'Hızlı Teslimat',
      description: 'Siparişlerinizi en kısa sürede kapınıza ulaştırmayı taahhüt ediyoruz. Türkiye genelinde hızlı ve güvenli kargo hizmeti sunuyoruz.'
    },
    {
      id: 2,
      icon: 'fas fa-shield-alt',
      title: 'Güvenli Alışveriş',
      description: 'Tüm ödeme işlemleriniz SSL sertifikası ile korunmaktadır. Kişisel bilgileriniz bizimle güvende.'
    },
    {
      id: 3,
      icon: 'fas fa-medal',
      title: 'Kalite Garantisi',
      description: 'Satışa sunduğumuz tüm ürünler orijinal ve kalite kontrolünden geçmiştir. Müşteri memnuniyeti bizim için ön plandadır.'
    },
    {
      id: 4,
      icon: 'fas fa-undo-alt',
      title: 'Kolay İade',
      description: '14 gün içinde koşulsuz iade garantisi sunuyoruz. Memnun kalmadığınız ürünleri kolayca iade edebilirsiniz.'
    },
    {
      id: 5,
      icon: 'fas fa-headset',
      title: '7/24 Müşteri Desteği',
      description: 'Sorularınız için her zaman yanınızdayız. Profesyonel müşteri hizmetleri ekibimiz size yardımcı olmak için hazır.'
    },
    {
      id: 6,
      icon: 'fas fa-tags',
      title: 'En İyi Fiyat',
      description: 'Piyasadaki en rekabetçi fiyatları sunmayı taahhüt ediyoruz. Kaliteli ürünler, uygun fiyatlar.'
    }
  ];

  return (
    <>
      <section className="section commitments-page">
        <div className="container">
          <button
            onClick={() => navigate('/')}
            className="back-button"
          >
            ← Ana Sayfaya Dön
          </button>

          <h1 className="section-title">Taahhütlerimiz</h1>
          <p className="commitments-intro">
            Müşterilerimize en iyi hizmeti sunmak için verdiğimiz sözler. 
            Güveninizi kazanmak ve korumak en büyük önceliğimizdir.
          </p>

          <div className="commitments-grid">
            {commitments.map((commitment) => (
              <div key={commitment.id} className="commitment-card">
                <div className="commitment-icon">
                  <i className={commitment.icon}></i>
                </div>
                <h3 className="commitment-title">{commitment.title}</h3>
                <p className="commitment-description">{commitment.description}</p>
              </div>
            ))}
          </div>

          <div className="commitments-cta">
            <h2>Bize Güvenin</h2>
            <p>Yılların deneyimi ve binlerce mutlu müşteriyle, size en iyi alışveriş deneyimini sunmaya devam ediyoruz.</p>
            <button onClick={() => navigate('/products')} className="cta-button">
              <i className="fas fa-shopping-bag"></i> Alışverişe Başla
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Commitments;
