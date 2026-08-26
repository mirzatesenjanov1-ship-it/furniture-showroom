import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ShowroomVitrine } from './components/ShowroomVitrine';

export const App: React.FC = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('996706035765');

  useEffect(() => {
    // Global Settings Fetch
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.data?.whatsappNumber) {
          setWhatsappNumber(data.data.whatsappNumber);
        }
      })
      .catch(() => {});
  }, []);

  const demoItems = [
    {
      title: 'Ашкана Гарнитуру №24',
      slug: 'ashkana-garnitur-24',
      price: 85000,
      dimensions: '3.2 м',
      material: 'ЛДСП + МДФ фасад',
      description: 'Заманбап стилде даярдалган премиум сапаттагы ашкана мебели.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-900 flex flex-col justify-between">
        <Header whatsappNumber={whatsappNumber} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
          <Routes>
            <Route path="/" element={
              <div>
                <ShowroomVitrine items={demoItems} whatsappNumber={whatsappNumber} />
                <div className="py-12 text-center text-stone-400">
                  <h3 className="text-xl font-serif text-amber-200 mb-2">Шоурум каталогу даярдалууда</h3>
                  <p className="text-sm">Админ панель аркылуу жаңы эмеректерди кошууга болот.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <footer className="bg-stone-950 border-t border-stone-800 py-8 text-center text-xs text-stone-500">
          <p>© 2026 Мебель Шоурум. Бардык укуктар корголгон.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
