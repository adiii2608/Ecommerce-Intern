import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import cartIcon from '../Assets/CartIcon.png';
import logo from '../Assets/logo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = ({ user, setUser }) => {
  const [menu, setMenu] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => {
      const isOpening = !prev;
      document.body.style.overflow = isOpening ? "hidden" : "auto";
      return isOpening;
    });
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-layout">
        {/* Mobile Header */}
        <div className="nav-mobile-header">
          <div className="hamburger" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          <div className="nav-logo">
            <img src={logo} alt="logo" className="logo" />
            <p>CLOTHING</p>
          </div>

          {/* Cart icon is now always visible */}
          <div className="nav-login-cart">
            <Link to="/cart" onClick={closeMobileMenu}>
              <img src={cartIcon} alt="Cart Icon" className="cart-icon" />
              {/* Counter only shows when user is logged in and has items */}
              {user && totalCount > 0 && (
                <div className="nav-cart-count">{totalCount}</div>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu-container ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            {["Home", "All", "Mens", "Womens", "Jewelery", "Electronics"].map((item) => (
              <li
                key={item}
                onClick={() => {
                  setMenu(item === "Home" ? "home" : item.toLowerCase());
                  closeMobileMenu();
                }}
              >
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={menu === item.toLowerCase() ? "active-link" : ""}
                >
                  {item}
                </Link>
              </li>
            ))}
            <div className="nav-user-actions">
              {user ? (
                <>
                  <span className="nav-user">
                    Hello, <strong>{user.username}</strong>
                  </span>
                </>
              ) : (
                <button className="nav-btn" onClick={() => navigate('/login')}>
                  <svg className="profile-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="currentColor" />
                  </svg>
                  <span className="profile-text">Profile</span>
                </button>
              )}
            </div>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </ul>
        </div>
      </div>
    </div>
  );
};