import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export default function Login({ onLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (data) => {
  setIsLoading(true);
  try {
    const res = await axios.post(
      'http://localhost:5000/login',
      data,
      { withCredentials: true }
    );
    if (res.data.success) {
      onLogin(res.data.user);
      navigate('/all');
    } else {
      alert(res.data.message || 'Login failed');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Invalid credentials');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <div className="logo-container">
            <User className="logo-icon" />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit(handleLogin)} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-container">
                <User className="input-icon" />
                <input
                 type="text"
  id="username"
  {...register('username', { required: 'Username is required' })}
  className="form-input"
  placeholder="Enter your username"
                  
         />
               {errors.username && <p>{errors.username.message}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type="text"
  id="password"
  {...register('password', { required: 'Username is required' })}
  className="form-input"
  placeholder="Enter your username"
                />
                {errors.password && <p>{errors.password.message}</p>}



                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" className="checkbox" />
                <span className="checkbox-label">Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" disabled={isLoading} className="signin-button">
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="button-icon" />
                </>
              )}
            </button>

            <div className="signup-option">
              <p className="signup-text">
                Don't have an account?{' '}
               
<Link to="/register" className="signup-link">
  Sign up?
</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="login-footer">
          <p className="footer-text">
            By signing in, you agree to our{' '}
            <a href="#" className="footer-link">Terms of Service</a> and{' '}
            <a href="#" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}