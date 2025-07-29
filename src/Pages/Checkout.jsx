// Checkout.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ user }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [form, setForm] = useState({
    order_instructions: '',
    delivery_instructions: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("🧮 Calculated totalAmount:", totalPrice);

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script is already loaded
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log("✅ Razorpay script loaded successfully");
          resolve(true);
        };
        script.onerror = () => {
          console.error("❌ Failed to load Razorpay script");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        alert("Payment gateway is loading. Please try again in a moment.");
        return;
      }

      // Validate required fields
      if (!form.address_line1 || !form.city || !form.state || !form.zip_code || !form.country) {
        alert("Please fill in all required address fields");
        return;
      }

      console.log("🔍 Sending to /create-order:", {
        amount: totalPrice,
        orderInstructions: form.order_instructions,
        deliveryInstructions: form.delivery_instructions
      });

      const res = await axios.post('http://localhost:5000/create-order', {
        amount: totalPrice,
        orderInstructions: form.order_instructions,
        deliveryInstructions: form.delivery_instructions
      }, { withCredentials: true });

      const order = res.data;
      console.log("✅ Order created:", order);

      const options = {
        key: "rzp_test_o08YVZwKcCbv9M", // replace with real key
        amount: order.amount,
        currency: order.currency,
        name: "Your Store",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          try {
            console.log("💳 Payment successful, verifying...");
            await axios.post('http://localhost:5000/verify-payment', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              cart: cartItems,
              user_id: user?.id,
              instructions: form.order_instructions,
              delivery: form.delivery_instructions,
              totalAmount: totalPrice,
              addressData: {
                address_line1: form.address_line1,
                address_line2: form.address_line2,
                city: form.city,
                state: form.state,
                zip_code: form.zip_code,
                country: form.country
              }
            }, { withCredentials: true });

            navigate('/order-success');
          } catch (verifyError) {
            console.error("❌ Payment verification failed:", verifyError);
            navigate('/order-failed');
          }
        },
        prefill: {
          name: user?.username || '',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        console.error("❌ Payment failed:", response.error);
        navigate('/order-failed');
      });
      rzp.open();

    } catch (err) {
      console.error("❌ Payment Error:", err);
      console.error("Error details:", err.response?.data);
      alert(`Payment could not be initiated: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
     
      <h3>Delivery Address</h3>

      <div className="form-group">
        <label>Address Line 1 *</label>
        <input
          type="text"
          name="address_line1"
          value={form.address_line1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Address Line 2</label>
        <input
          type="text"
          name="address_line2"
          value={form.address_line2}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>City *</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>State *</label>
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Zip Code *</label>
        <input
          type="text"
          name="zip_code"
          value={form.zip_code}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Country *</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Order Instructions</label>
        <textarea
          name="order_instructions"
          value={form.order_instructions}
          onChange={handleChange}
          placeholder="e.g. Pack as a gift"
        />
      </div>

      <div className="form-group">
        <label>Delivery Instructions</label>
        <textarea
          name="delivery_instructions"
          value={form.delivery_instructions}
          onChange={handleChange}
          placeholder="e.g. Ring the bell, leave at doorstep"
        />
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total: ₹{totalPrice}</p>
      </div>

      <button onClick={handlePayment}>Proceed to Pay ₹{totalPrice}</button>
    </div>
  );
}