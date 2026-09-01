import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Бэкенд URL дарегин env өзгөрмөдөн же катуу көрсөтүлгөн серверден алуу
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://furniture-showroom-backend.onrender.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      // Респонс JSON экенин текшерүү (HTML 404 чыгып кетсе туура кармоо)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Серверге туташууда ката чыкты: Бэкенд сервери табылган жок же аткарылбай жатат.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Логин же пароль ката!');
      }

      localStorage.setItem('admin_token', data.token);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Байланыш катасы');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 shadow-2xl border border-gray-800">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Админ Панелге Кирүү</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Электрондук почта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-400 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Текшерилүүдө...' : 'Кирүү'}
          </button>
        </form>
      </div>
    </div>
  );
};
