import React from 'react';
import Footer from '../components/Footer';
import '../styles/about.css';

const AboutUs = () => {
  return (
    <>
      <section className="section about-section">
        <div className="container">
          <h1 className="section-title">Hakkımızda</h1>
          
          {/* Text area placeholder - User will fill this in later */}
          <div className="about-content">
            <div className="about-text-placeholder">
              <p className="placeholder-text">
                {/* Bu alan daha sonra doldurulacak */}
                [Buraya hakkımızda metninizi ekleyin...]
              </p>
            </div>
          </div>

          {/* Four Buttons Section */}
          <div className="about-buttons">
            <button className="btn btn-primary about-btn">
              Misyonumuz
            </button>
            <button className="btn btn-primary about-btn">
              Vizyonumuz
            </button>
            <button className="btn btn-primary about-btn">
              Ekibimiz
            </button>
            <button className="btn btn-primary about-btn">
              İletişim
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
