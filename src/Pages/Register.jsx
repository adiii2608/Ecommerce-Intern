import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, PencilLine, ArrowRight } from 'lucide-react';
import './Register.css';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      if (res.data.success) {
        alert("Registered successfully!");
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <div className="logo-container">
            <PencilLine className="logo-icon" />
          </div>
          <h1 className="login-title">Create an Account</h1>
          <p className="login-subtitle">Join us and start shopping today</p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-container">
                <User className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  {...register("full_name", { required: "Full name is required" })}
                />
              </div>
              {errors.full_name && <p className="error-text">{errors.full_name.message}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email"
                    }
                  })}
                />
              </div>
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Phone</label>
              <div className="input-container">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number"
                    }
                  })}
                />
              </div>
              {errors.phone && <p className="error-text">{errors.phone.message}</p>}
            </div>

            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-container">
                <User className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Choose a username"
                  {...register("username", { required: "Username is required" })}
                />
              </div>
              {errors.username && <p className="error-text">{errors.username.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters"
                    }
                  })}
                />
              </div>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="button-icon" />
                </>
              )}
            </button>

            <div className="signup-option">
              <p className="signup-text">
                Already have an account?{' '}
                <Link to="/login" className="signup-link">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="login-footer">
          <p className="footer-text">
            By signing up, you agree to our{' '}
            <a href="#" className="footer-link">Terms of Service</a> and{' '}
            <a href="#" className="footer-link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
