import React, { useState } from 'react';
import Cookies from 'js-cookie';

import './index.css';

const AddStore = () => {
  const [storeData, setStoreData] = useState({
    name: '', email: '', address: '', owner_id: ''
  });
  const token = Cookies.get('jwt_token');

  const handleChange = e => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/admin/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(storeData)
      });
      if (!res.ok) throw new Error('Failed to create store');
      alert('Store added successfully!');
    } catch (err) {
      console.error('Error adding store:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="tab-heading">Add Store</h2>
      <input name="name" placeholder="Store Name" onChange={handleChange} required className="add-store-input"/>
      <input name="email" placeholder="Email" onChange={handleChange} required className="add-store-input"/>
      <input name="address" placeholder="Address" onChange={handleChange} required className="add-store-input"/>
      <input name="owner_id" placeholder="Owner ID" onChange={handleChange} required className="add-store-input"/>
      <button type="submit" className="add-store-btn">Create Store</button>
    </form>
  );
};

export default AddStore;