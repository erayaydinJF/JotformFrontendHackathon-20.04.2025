import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

const CartPage: React.FC = () => {
  const { items } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
      </div>
      
      <Cart />
      
      {items.length === 0 && (
        <div className="empty-cart-actions">
          <p>Your cart is empty. Start shopping now to add products to your cart.</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      )}
      
      {items.length > 0 && (
        <div className="cart-actions">
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="proceed-to-checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage; 