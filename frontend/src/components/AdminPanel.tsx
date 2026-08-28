import React, { useState } from 'react';
import { Plus, Trash2, Edit, Eye, EyeOff, Save, Lock } from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  price: number;
  material: string;
  dimensions: string;
  category: string;
  isPublished: boolean;
}

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: '1',
      title: 'Премиум Конок Диваны',
      price: 85000,
      material: 'Италиялык Велюр, Карагач',
      dimensions: '240 x 100 x 85 см',
      category: 'Дивандар',
      isPublished: true,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newDimensions, setNewDimensions] = useState('');
  const [newCategory, setNewCategory] = useState('Дивандар');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Сыр сөз туура эмес!');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const item: ProductItem = {
      id: Date.now().toString(),
      title: newTitle,
      price: Number(newPrice),
      material: newMaterial || 'Көрсөтүлгөн эмес',
      dimensions: newDimensions || 'Стандарттык',
      category: newCategory,
      isPublished: true,
    };

    setProducts([...products, item]);
    setNewTitle('');
    setNewPrice('');
    setNewMaterial('');
    setNewDimensions('');
  };

  const togglePublish = (id: String) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, isPublished: !p.isPublished } : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Админ панелге кирүү</h2>
          </div>
          <input
            type="password"
            placeholder="Админ сыр сөзүн жазыңыз..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all"
          >
            Кирүү
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-white">Администратор Панели</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg"
          >
            чыгуу
          </button>
        </div>

        {/* Add Product Form */}
        <form
          onSubmit={handleAddProduct}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-10 space-y-4"
        >
          <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Жаңы эмерек кошуу
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Эмеректин аталышы"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              required
            />
            <input
              type="number"
              placeholder="Баасы (KGS)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              required
            />
            <input
              type="text"
              placeholder="Материалы"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
            <input
              type="text"
              placeholder="Өлчөмү"
              value={newDimensions}
              onChange={(e) => setNewDimensions(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" /> Сактоо
          </button>
        </form>

        {/* Product Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="p-4">Аталышы</th>
                <th className="p-4">Баасы</th>
                <th className="p-4">Категория</th>
                <th className="p-4">Статус</th>
                <th className="p-4">Аракеттер</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="p-4 font-medium text-white">{p.title}</td>
                  <td className="p-4 text-amber-400">{p.price.toLocaleString()} KGS</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        p.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {p.isPublished ? 'Активдүү' : 'Жашыруун'}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button
                      onClick={() => togglePublish(p.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      {p.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
