import React from 'react';
import Footer from '../components/Footer';
import '../styles/about.css';

const About = () => {
  return (
    <>
      <div className="about-page">
        <div className="about-container">
          <div className="about-header">
            <h1>Hakkımızda</h1>
            <div className="about-subtitle">Güven, Kalite ve Müşteri Memnuniyeti</div>
          </div>

          <div className="about-content">
            <div className="about-section main-story">
              <div className="section-icon">🏆</div>
              <h2>Hikayemiz</h2>
              <p>
                Sizlere sorunsuz ürün ve sorunsuz teslimat hizmeti verebilmek için tam <strong>2019'dan beri</strong> çalışıyoruz. 
                Yılların tecrübesi ve binlerce mutlu müşterimizin desteğiyle bugün sektörün en güvenilir adreslerinden biri haline geldik.
              </p>
              <p>
                Her bir ürünümüzün arkasında <strong>%100 güvence</strong> ile duruyoruz. Çünkü biliyoruz ki güven, kelimelerle değil 
                icraatlarla kazanılır. Sattığımız her ürün titizlikle kontrol edilir, paketlenir ve güvenle kapınıza teslim edilir.
              </p>
            </div>

            <div className="trust-badges">
              <div className="trust-badge">
                <div className="badge-icon">✅</div>
                <h3>Orijinal Ürün Garantisi</h3>
                <p>Tüm ürünlerimiz orijinaldir ve resmi distribütörlerden temin edilmektedir.</p>
              </div>
              <div className="trust-badge">
                <div className="badge-icon">🚚</div>
                <h3>Güvenli Teslimat</h3>
                <p>Siparişleriniz özenle paketlenir ve hasarsız teslimat garantisi ile gönderilir.</p>
              </div>
              <div className="trust-badge">
                <div className="badge-icon">💯</div>
                <h3>Müşteri Memnuniyeti</h3>
                <p>%98 müşteri memnuniyeti oranıyla sektörde lider konumdayız.</p>
              </div>
              <div className="trust-badge">
                <div className="badge-icon">🔒</div>
                <h3>Güvenli Alışveriş</h3>
                <p>SSL sertifikası ile korunan güvenli ödeme altyapısı sunuyoruz.</p>
              </div>
            </div>

            <div className="about-section commitment">
              <div className="section-icon">🤝</div>
              <h2>Taahhütümüz</h2>
              <p>
                Müşterilerimize sadece ürün satmıyoruz, <strong>güven satıyoruz</strong>. Herhangi bir sorun yaşadığınızda, 
                satış sonrası destek ekibimiz 7/24 yanınızda. Ürünlerimizle ilgili memnun kalmadığınız her durumda 
                <strong> koşulsuz iade ve değişim hakkı</strong> sunuyoruz.
              </p>
              <p>
                Sizin memnuniyetiniz bizim önceliğimizdir. Her bir müşterimiz bizim için değerlidir ve 
                her sipariş, aile üyemize gönderiyormuş gibi özenle hazırlanır.
              </p>
            </div>

            <div className="about-section values">
              <div className="section-icon">⭐</div>
              <h2>Değerlerimiz</h2>
              <div className="values-grid">
                <div className="value-item">
                  <strong>Dürüstlük</strong>
                  <p>Her zaman şeffaf ve dürüst iletişim</p>
                </div>
                <div className="value-item">
                  <strong>Kalite</strong>
                  <p>En iyi ürünleri en iyi fiyatlarla</p>
                </div>
                <div className="value-item">
                  <strong>Hız</strong>
                  <p>Hızlı kargo ve teslimat</p>
                </div>
                <div className="value-item">
                  <strong>Destek</strong>
                  <p>7/24 müşteri hizmetleri</p>
                </div>
              </div>
            </div>

            <div className="about-section stats">
              <h2>Rakamlarla Biz</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">7+</div>
                  <div className="stat-label">Yıllık Deneyim</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10.000+</div>
                  <div className="stat-label">Mutlu Müşteri</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50.000+</div>
                  <div className="stat-label">Teslim Edilen Sipariş</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">%98</div>
                  <div className="stat-label">Memnuniyet Oranı</div>
                </div>
              </div>
            </div>

            <div className="about-section contact-cta">
              <div className="section-icon">📞</div>
              <h2>Bize Ulaşın</h2>
              <p>
                Sorularınız mı var? Siparişlerinizle ilgili yardıma mı ihtiyacınız var? 
                Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.
              </p>
              <p>
                <strong>Güvenle alışveriş yapın, biz arkanızdayız!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
