import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import { Details } from './Pages/Details';
import { Cart } from './Pages/Cart';
import Footer from './Pages/Footer';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import axios from 'axios';
import Register from './Pages/Register';
import Checkout from './Pages/Checkout';
import OrderSuccess from './Pages/OrderSuccess';
import OrderFailed from './Pages/OrderFailed';

export default function MainApp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/session', { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        }
      });
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/all" element={<ShopCategory type="all" />} />
        <Route path="/mens" element={<ShopCategory type="men's clothing" />} />
        <Route path="/womens" element={<ShopCategory type="women's clothing" />} />
        <Route path="/jewelery" element={<ShopCategory type="jewelery" />} />
        <Route path="/electronics" element={<ShopCategory type="electronics" />} />
        <Route path="/product/:id" element={<Details />} />
        
        {/* Cart is now accessible to all users, but behavior changes based on login status */}
        <Route path="/cart" element={<Cart user={user} />} />

        <Route path="/checkout" element={<Checkout user={user} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failed" element={<OrderFailed />} />

      </Routes>
    </>
  );
}