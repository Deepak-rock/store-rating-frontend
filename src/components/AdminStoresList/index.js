import React, {useState, useEffect, useCallback} from 'react';
import Cookies from 'js-cookie';

import './index.css';

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const token = Cookies.get('jwt_token');

  const fetchStores = useCallback(async () => {
    try {
      const response = await fetch('https://store-rating-backend-19k6.onrender.com/admin/stores', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch stores');
      const data = await response.json();
      setStores(data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="stores-dashboard">
      <h2 className="tab-heading">Stores Overview</h2>
      <div className="table-container">
        <table className="user-table">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td className="user-table-de">{store.name}</td>
                <td className="user-table-de">{store.email}</td>
                <td className="user-table-de">{store.address}</td>
                <td className="user-table-de">{parseFloat(store.rating).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStores;