import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const successfullySubmit = (token, data)=> {
    Cookies.set('jwt_token', token, {expires: 30})
    Cookies.set('user_role', data.user.role, {expires: 30});
    Cookies.set('name', data.user.name, {expires: 30});
    
    switch (data.user.role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'store_owner':
        navigate('/store-panel');
        break;
      default:
        navigate('/user');
        break;
    }
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    try {
      const apiUrl = 'http://localhost:8000/login';
      const response = await fetch(apiUrl ,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        successfullySubmit(data.token, data)
      }  else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Something went wrong');
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return navigate('/login');
  }

  return (
    <div className="app-container">
      <div className="responsive-container">
        <form className="login-form" onSubmit={onSubmitForm}>
          <h2 className="login-head">Welcome Back</h2>

          <div className="login-input-container">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="login-input-field"
              id="email"
            />
          </div>

          <div className="login-input-container">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="login-input-field"
              id="password"
            />
          </div>

          <div className="login-checkbox-container">
            <input 
              className="login-check-box" 
              id="checkBox"
              onClick={() => setShowPassword(cur => !cur)} 
              type="checkbox"
            />
            <label htmlFor="checkBox" className="login-show-label">Show Password</label>
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          {errorMessage && <p className="login-error-msg">*{errorMessage}</p>}

          <p>Don't have account <Link to="/signin">Regsiter</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;