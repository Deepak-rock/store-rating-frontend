import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Header from '../../components/Header';
import UpdatePasswordForm from '../../components/UpdatePassword';

import './index.css';

const NormalUser = () => {
  const [storeData, setStoreData] = useState(null);
  const [nameSearch, setNameSearch] = useState('');
  const [addressSearch, setAddressSearch] = useState('');
  const [error, setError] = useState('');

  const token = Cookies.get('jwt_token');
  const username = Cookies.get('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/stores?name=${nameSearch}&address=${addressSearch}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setStoreData(data);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError('Unable to load dashboard data');
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, nameSearch, addressSearch]);

  const submitRating = async (storeId, userRating) => {
    try {
      const response = await fetch(`http://localhost:8000/stores/${storeId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: userRating }),
      });
      const result = await response.json();
      console.log(result.message);
      setNameSearch(nameSearch);
      addressSearch(addressSearch);
    } catch (err) {
      setError('Unable to submit rating');
    }
  };

  if (!storeData) return <p>Loading dashboard...</p>;
  return (
    <>
      <Header />
      <div className="user-panel-container">
        <div className="resp-con">
        <div className="row-con">
            <h1 className="heading">Welcome, {username}</h1>
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
          <div className="search-and-filter-container">
            <input
              type="text"
              placeholder="Search by name"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Filter by address"
              value={addressSearch}
              onChange={(e) => setAddressSearch(e.target.value)}
              className="search-input"
            />
          </div>
          {error ? (
            <p className="user-error">{error}</p>
          ) : (
            <ul className="stores-list">
              {storeData.map(store => (
                <li className="store-cart" key={store.id}>
                  <img src="https://i.ibb.co/wNL17z6G/storeimg.jpg" alt="Store" className="store-img" />
                  <div className="store-details">
                    <h3 className="store-name">{store.name}</h3>
                    <div className="rating-btn">
                      <span className="overall-rating">Overall Rating {parseFloat(store.overall_rating).toFixed(1)} <FaStar size={16} color="gold" /></span>
                      <span className="user-rating">
                        Your Rating {store.user_rating ? store.user_rating : 'Not Rated'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const userRating = prompt('Rate this store (1-5):');
                        if (userRating >= 1 && userRating <= 5) {
                          submitRating(store.id, userRating);
                        } else {
                          alert('Invalid rating. Please enter a value between 1 and 5.');
                        }
                      }}
                      className="rate-btn"
                    >
                      {store.user_rating ? 'Edit rating' : 'Submit rating'}
                    </button>
                    <p className="store"><FaLocationDot /> {store.address}</p>
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

export default NormalUser;
