import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/ProductsPage.css';

const ProductsPage: React.FC = () => {
  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Browse through our collection of quality products</p>
      </div>
      
      <div className="products-container">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage; 