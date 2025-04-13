import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../components/Header';
import Popup from 'reactjs-popup'
import {FaStar} from 'react-icons/fa';
import UpdatePasswordForm from '../../components/UpdatePassword';

import './index.css';

const StoreDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const token = Cookies.get('jwt_token');
  const name = Cookies.get('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/store/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load store dashboard');
      }
    };

    if (token) fetchData();
  }, [token]);

  if (!dashboardData) return <p>Loading dashboard...</p>;

  return (
    <>
      <Header />
      <div className="store-panel-container">
        <div className="resp-con">
          <div className="row-con">
            <h1 className="heading">Welcome, {name}</h1>
            <Popup
              modal
              trigger={ 
                <button className="update-password" type="button">
                  Change Password
                </button>
              }
            >
              {close => (
                <>
                  <div>
                    <UpdatePasswordForm />
                  </div>
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </>
              )}
            </Popup>
          </div>
          <h2 className="average-rating">
            Average Rating {dashboardData.average_rating} <FaStar color="gold" />
          </h2>
          {error ? (
            <p className="store-error">{error}</p>
          ) : (
            <ul className="ratings-list">
              {dashboardData.ratings.map((r, i) => (
                <li key={i} className="rating-card">
                  <div className="rating-info">
                    <h3>Name : {r.user_name}</h3>
                    <p>Address: {r.address}</p>
                    <p>Email: {r.email}</p>
                    <div className="rating-value">
                      <span>Rating {r.rating} <FaStar color="gold" /></span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default StoreDashboard;
