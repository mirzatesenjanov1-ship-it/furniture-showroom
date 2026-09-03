import React, { useState } from 'react';

interface FurnitureItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const sampleItems: FurnitureItem[] = [
  { id: 1, name: "Заманбап диван", category: "Конок бөлмө", price: "25 000 сом", image: "https://via.placeholder.com/300x200?text=Sofa" },
  { id: 2, name: "Жыгач стол", category: "Ашкана", price: "15 000 сом", image: "https://via.placeholder.com/300x200?text=Table" },
  { id: 3, name: "Кровать Премиум", category: "Уктоочу бөлмө", price: "35 000 сом", image: "https://via.placeholder.com/300x200?text=Bed" }
];

export default function App() {
  const [items] = useState<FurnitureItem[]>(sampleItems);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Furniture Showroom</h1>
        <p style={{ color: '#7f8c8d' }}>Эмеректердин каталогу</p>
      </header>

      <main>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <span style={{ fontSize: '12px', background: '#e0e0e0', padding: '3px 8px', borderRadius: '4px' }}>{item.category}</span>
                <h3 style={{ margin: '10px 0 5px 0' }}>{item.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#27ae60', fontSize: '18px', margin: 0 }}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', color: '#95a5a6' }}>
        <p>&copy; 2026 Furniture Showroom. Бардык укуктар корголгон.</p>
      </footer>
    </div>
  );
}
