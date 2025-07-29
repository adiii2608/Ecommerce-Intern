import React from 'react';
import { useCart } from '../Context/CartContext';
import './Cart.css';
import empty from '../Components/Assets/empty.gif';
import { useNavigate } from 'react-router-dom';


export const Cart = ({ user }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const navigate = useNavigate();

  // If user is not logged in, show empty cart
  const displayItems = user ? cartItems : [];

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>Your Cart</h2>
        
        {!user ? (
          // Show message for logged out users
          <div className='empty-cart-container'>
            <p>Please log in to view your cart items</p>
            <img src={empty} alt="Empty Cart" className="empty-cart-gif" />
          </div>
        ) : displayItems.length === 0 ? (
          // Show empty cart for logged in users with no items
          <div className='empty-cart-container'>
            <p>No items in cart</p>
            <img src={empty} alt="Empty Cart" className="empty-cart-gif" />
          </div>
        ) : (
          // Show cart items for logged in users
          displayItems.map(item => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt={item.title} className='cart-image'/>
              <div className="cart-card-content">
                <p className="cart-card-title">{item.title}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                  Remove
                </button>
              </div>
              <p className="cart-card-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))
        )}
      </div>

      {/* Only show cart summary for logged in users with items */}
      {user && displayItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
  Checkout Now
</button>
          <button className="coupon-btn">Add Coupon</button>
        </div>
      )}
    </div>
  );
};