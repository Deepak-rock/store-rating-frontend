import React, { useState } from 'react';
import Cookies from 'js-cookie';

import './index.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', address: '', role: 'normal'
  });
  const [showPassword, setShowPassword] = useState(false);
  const token = Cookies.get('jwt_token');

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to create user');
      alert('User added successfully!');
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2 className="tab-heading">Add User</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="add-user-input" />
      <input name="email" placeholder="Email" onChange={handleChange} className="add-user-input"/>
      <input name="password" placeholder="Password" type={showPassword ? "text" : "password"} onChange={handleChange} className="add-user-input"/>
      <input name="address" placeholder="Address" onChange={handleChange} className="add-user-input"/>
      <select name="role" onChange={handleChange} className="add-user-input">
        <option value="normal">Normal User</option>
        <option value="admin">Admin</option>
        <option value="store_owner">Store Owner</option>
      </select>

      <div className="checkbox-container">
        <input 
          className="check-box" 
          id="checkBox"
          onClick={() => setShowPassword(cur => !cur)} 
          type="checkbox"
        />
        <label htmlFor="checkBox" className="show-label">Show Password</label>
      </div>

      <button type="submit" className="add-user-btn">Create User</button>
    </form>
  );
};

export default AddUser;