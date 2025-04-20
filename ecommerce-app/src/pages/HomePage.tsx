import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to JotShop</h1>
          <p>Discover amazing products from our collection</p>
          <Link to="/products" className="shop-now-btn">Shop Now</Link>
        </div>
      </div>
      
      <div className="featured-products">
        <h2>Featured Products</h2>
        <ProductList />
      </div>
      
      <div className="benefits-section">
        <div className="benefit">
          <span className="material-icons">local_shipping</span>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        
        <div className="benefit">
          <span className="material-icons">security</span>
          <h3>Secure Payment</h3>
          <p>100% secure payment</p>
        </div>
        
        <div className="benefit">
          <span className="material-icons">support_agent</span>
          <h3>24/7 Support</h3>
          <p>Dedicated support</p>
        </div>
        
        <div className="benefit">
          <span className="material-icons">autorenew</span>
          <h3>Easy Returns</h3>
          <p>30 day return policy</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 