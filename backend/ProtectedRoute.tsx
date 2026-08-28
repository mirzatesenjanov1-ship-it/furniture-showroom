import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedAdminRoute = () => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    // Токен жок болсо, авторизация баракчасына багыттайт
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
