import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import SocialMedia from '../components/SocialMedia';
import Footer from '../components/Footer';
import { products } from '../data/products';
import '../styles/product.css';

const Home = () => {
  const { user } = useUser();
  const featuredProducts = products.slice(0, 5);

  return (
    <>
      <HeroSlider />

      <section className="section">
        <div className="container">
          <h2 className="section-title">Öne Çıkan Ürünler</h2>

          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <SocialMedia />
      <Footer />
    </>
  );
};

export default Home;
