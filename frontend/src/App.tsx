import React, { useState, useEffect } from 'react';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }

    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    window.location.hash = '#/';
  };

  // Маршрутизация логикасы (#/admin же #/admin/login)
  if (currentPath === '#/admin') {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }
    return (
      <div>
        <div className="bg-gray-800 p-4 text-right">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Чыгуу (Logout)
          </button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Башкы витрина сайтыңыздын коду ушул жерде калат */}
      <footer className="p-4 text-center border-t border-gray-800 text-xs text-gray-500">
        <a href="#/admin" className="hover:underline">Администратордук кирүү</a>
      </footer>
    </div>
  );
};

export default App;
