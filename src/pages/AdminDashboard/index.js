import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie'

import Header from '../../components/Header';
import AdminUsers from '../../components/AdminUsersList';
import AdminStores from '../../components/AdminStoresList';
import AddUser from '../../components/AddUser';
import AddStore from '../../components/AddStore'
import './index.css'

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Users');

  const token = Cookies.get('jwt_token');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://store-rating-backend-19k6.onrender.com/admin/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        console.error('Error fetching dashboard:', err)
        setError('Unable to load dashboard data')
      }
    }

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const renderTab = () => {
    switch (activeTab) {
      case 'Users':
        return <AdminUsers />;
      case 'Stores':
        return <AdminStores />;
      case 'Add User':
        return <AddUser />
      case 'Add Store':
        return <AddStore />
      default:
        return null;
    }
  };

  if (!dashboardData) return <p>Loading dashboard...</p>

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        <div className="respon-container">

          <div className="left-container">
            <h1 className="dashboard-heading">Dashboard Stats</h1>
            {error ? (
              <p className="dashboard-error">{error}</p>
            ) : (
              <div className="dashboard-cards-con">
                <div className="dashboard-card">
                  <h2 className="stats">{dashboardData.total_users}</h2>
                  <p className="stats-name">Users</p>
                </div>
                <div className="dashboard-card">
                  <h2 className="stats">{dashboardData.total_stores}</h2>
                  <p className="stats-name">Stores</p>
                </div>
                <div className="dashboard-card">
                  <h2 className="stats">{dashboardData.total_ratings}</h2>
                  <p className="stats-name">Ratings</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="right-container">
            <div className="tags-container">
              {['Users', 'Stores', 'Add User', 'Add Store'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? "active-tag-btn" : "tag-btn"}
                >
                  {tab}
                </button>
              ))}
            </div>
            <>{renderTab()}</>
          </div>

        </div>
      </div>
    </>
  )
};

export default AdminDashboard;