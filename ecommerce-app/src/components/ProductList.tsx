import React, { useEffect, useState } from 'react';
import { getFormSubmissions, getPaymentInfo } from '../services/api';
import { Product } from '../types';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch payment info and submissions in parallel
        const [paymentInfoResponse, submissionsResponse] = await Promise.all([
          getPaymentInfo(),
          getFormSubmissions()
        ]);
        
        if (paymentInfoResponse.responseCode !== 200) {
          throw new Error('Failed to fetch payment info');
        }
        
        if (submissionsResponse.responseCode !== 200) {
          throw new Error('Failed to fetch submissions');
        }
        
        const paymentContent = paymentInfoResponse.content || {};
        const productList: Product[] = [];
        
        // Parse payment info products
        if (paymentContent.products && Array.isArray(paymentContent.products)) {
          paymentContent.products.forEach((product: any) => {
            productList.push({
              id: product.pid || String(productList.length + 1),
              name: product.name || 'Unknown Product',
              price: parseFloat(product.price) || 0,
              description: product.description || '',
              image: product.image || 'https://via.placeholder.com/150'
            });
          });
        }
        
        // If no products found in payment info, try to extract from submissions
        if (productList.length === 0 && submissionsResponse.content && submissionsResponse.content.submissions) {
          submissionsResponse.content.submissions.forEach((submission: any) => {
            // This is placeholder logic, actual extraction depends on form structure
            // and will need to be adjusted based on actual data
            if (submission.answers) {
              // Find product-related answers and extract info
              const nameAnswer = Object.values(submission.answers).find((a: any) => a.text.toLowerCase().includes('name'));
              const priceAnswer = Object.values(submission.answers).find((a: any) => a.text.toLowerCase().includes('price'));
              
              if (nameAnswer && priceAnswer) {
                productList.push({
                  id: submission.id || String(productList.length + 1),
                  name: (nameAnswer as any).answer || 'Unknown Product',
                  price: parseFloat((priceAnswer as any).answer) || 0,
                  description: '',
                  image: 'https://via.placeholder.com/150'
                });
              }
            }
          });
        }
        
        setProducts(productList);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  return (
    <div className="product-list-container">
      <h2>Available Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 