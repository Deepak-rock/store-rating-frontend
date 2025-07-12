import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

import './index.css'

const SignInForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'normal',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async event => {
    event.preventDefault()
    try {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      const {name, email, password, address, role} = formData;

      const apiUrl = 'https://store-rating-backend-19k6.onrender.com/register';
      const response = await fetch(apiUrl ,{
        method: 'POST',    
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password, address, role}),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
        navigate('/login');
      }  else {
        setErrorMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Signin error:', err);
      setErrorMessage('Something went wrong');
    }
  }

  return (
    <div className="app-container">
      <div className="res-container">   
        <form className="sign-in-form" onSubmit={onSubmitForm}>
          <h2 className="sign-in-head">Create Account</h2>

          {/* name */}
          <div className="sign-in-input-container">
            <label className="sign-in-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="sign-in-input-field"
              id="name"
              value={formData.name}
            />
          </div>

          {/* role */}
          <div className="sign-in-input-container">
            <label className="sign-in-label" htmlFor="role">Your Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="sign-in-input-field"
              id="role"
              value={formData.role}
            >
              <option value="normal">Normal User</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>

          {/* email */}
          <div className="sign-in-input-container">
            <label className="sign-in-label" htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="sign-in-input-field"
              id="email"
            />
          </div>

          {/* address */}
          <div className="sign-in-input-container">
            <label className="sign-in-label" htmlFor="address">Address</label>
            <input
              value={formData.address}
              onChange={handleChange}
              type="text"
              name="address"
              placeholder="Enter your address"
              className="sign-in-input-field"
              id="address"
            />
          </div>

          {/* password */}
          <div className="sign-in-input-container">
            <label className="sign-in-label" htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="sign-in-input-field"
              id="password"
            />
          </div>

          {/* confirm password */}
          <div className="sign-in-input-container">
            <label className="sign-in-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="sign-in-input-field"
              id="confirmPassword"
              required
            />
          </div>

          {/* show password */}
          <div className="sign-in-checkbox-container">
            <input 
              className="sign-in-check-box" 
              id="checkBox"
              onClick={() => setShowPassword(cur => !cur)} 
              type="checkbox"
            />
            <label htmlFor="checkBox" className="sign-in-show-label">Show Password</label>
          </div>

          <button
            type="submit"
            className="sign-in-btn"
          >
            Sign In
          </button>

          {errorMessage && <p className="sign-in-error-msg">*{errorMessage}</p>}

          <p>Already have account <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;