import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import LogInForm from './components/LogInForm';
import SignInForm from './components/SignInForm';
import NormalUser from './pages/NormalUser';
import AdminDashboard from './pages/AdminDashboard';
import StoreDashboard from './pages/StoreDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UpdatePasswordForm from './components/UpdatePassword'
import './App.css';

const App = () => {
  const token = Cookies.get('jwt_token');
  const userRole = Cookies.get('user_role');

  const redirectDashboard = () => {
    if (userRole === 'admin') return <Navigate to="/admin-dashboard" />;
    if (userRole === 'store_owner') return <Navigate to="/store-panel" />;
    return <Navigate to="/user" />;
  };

  return (
    <Routes>
      <Route path="/login" element={token ? redirectDashboard() : <LogInForm />} />
      <Route path="/signin" element={token ? redirectDashboard() : <SignInForm />} />
      
      <Route path="/change-password" element={<UpdatePasswordForm />} />

      <Route
        path="/admin-dashboard"
        element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
      />
      <Route
        path="/store-panel"
        element={<ProtectedRoute element={<StoreDashboard />} allowedRoles={['store_owner']} />}
      />
      <Route
        path="/user"
        element={<ProtectedRoute element={<NormalUser />} allowedRoles={['normal']} />}
      />
    </Routes>
  );
};

export default App;