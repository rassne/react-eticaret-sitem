import React, { useState, useEffect } from 'react';
import '../styles/slider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Teknoloji Dünyasına Hoş Geldin",
      subtitle: "En yeni ve en inovatif ürünleri keşfet",
      buttonText: "Alışverişe Başla",
      buttonIcon: "fas fa-shopping-cart",
      className: "slide-1"
    },
    {
      title: "%50'ye Kadar İndirim",
      subtitle: "Seçili ürünlerde büyük indirimler",
      buttonText: "İndirimli Ürünlere Bak",
      buttonIcon: "fas fa-tag",
      className: "slide-2"
    },
    {
      title: "Hızlı ve Güvenli Teslimat",
      subtitle: "Tüm Türkiye'ye kargo kolaylığı",
      buttonText: "Ürünleri Keşfet",
      buttonIcon: "fas fa-truck",
      className: "slide-3"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (direction) => {
    setCurrentSlide((prev) => {
      const newSlide = prev + direction;
      return newSlide < 0 ? slides.length - 1 : newSlide % slides.length;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${slide.className} ${index === currentSlide ? 'active' : ''}`}
          >
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <a href="/products" className="slide-btn">
              <i className={slide.buttonIcon}></i> {slide.buttonText}
            </a>
          </div>
        ))}
      </div>

      <button className="slider-arrow prev" onClick={() => changeSlide(-1)}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-arrow next" onClick={() => changeSlide(1)}>
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-nav">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
