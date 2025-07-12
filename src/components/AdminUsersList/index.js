import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

import './index.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [error, setError] = useState('');
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    const fetchUsers = async () => {
      const query = new URLSearchParams(filters).toString();
      try {
        const response = await fetch(`https://store-rating-backend-19k6.onrender.com/admin/users?${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load users');
      }
    };

    if (token) {
      fetchUsers();
    }
    }, [token, filters]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="cart-container">
      <h2 className="tab-heading">All Users</h2>
      <div className="tab-cart">
        {['name', 'email', 'address', 'role'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={`Filter by ${field}`}
            value={filters[field]}
            onChange={handleInputChange}
            className="tab-cart-input"
          />
        ))}
      </div>
      {error && <p className="users-error">{error}</p>}
      <div className="table-container">
        <table className="user-table">
          <thead className="table-header">
            <tr>
              <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-table-de">{user.name}</td>
                <td className="user-table-de">{user.email}</td>
                <td className="user-table-de">{user.address}</td>
                <td className="user-table-de">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUsers;