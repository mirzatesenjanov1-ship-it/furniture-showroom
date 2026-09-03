import React, { useState } from 'react';

interface Furniture {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

const WHATSAPP_NUMBER = "996706035765";

const initialFurniture: Furniture[] = [
  {
    id: 1,
    title: "Заманбап Люкс Диван",
    category: "Конок бөлмө",
    price: 35000,
    description: "Жумшак, жогорку сапаттагы кездемеден жасалган конок бөлмө диваны.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"
  },
  {
    id: 2,
    title: "Эмен Ашкана Столу",
    category: "Ашкана",
    price: 22000,
    description: "Табигый жыгачтан жасалган бышык жана кенен ашкана столу.",
    imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600"
  },
  {
    id: 3,
    title: "Премиум Эки Кишилик Кровать",
    category: "Уктоочу бөлмө",
    price: 42000,
    description: "Ортопеддик матрасы менен кошо жайлуу уктоочу кровать.",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
  },
  {
    id: 4,
    title: "Иш Көнүгүү Столу",
    category: "Кабинет",
    price: 12500,
    description: "Минималистикалык стилдеги ыңгайлуу жумушчу стол.",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600"
  }
];

const categories = ["Баары", "Конок бөлмө", "Ашкана", "Уктоочу бөлмө", "Кабинет"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Баары");

  const filteredFurniture = selectedCategory === "Баары" 
    ? initialFurniture 
    : initialFurniture.filter(item => item.category === selectedCategory);

  const handleOrderViaWhatsApp = (item: Furniture) => {
    const message = `Саламатсызбы! Мен ушул эмеректи буйрутма берейин дедим эле:\n\n*${item.title}*\nКатегория: ${item.category}\nБаасы: ${item.price.toLocaleString()} сом\n\nТолугураак маалымат бере аласызбы?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="brand-title">Эмерек Дүйнөсү</h1>
            <p className="brand-subtitle">Сапаттуу жана заманбап эмеректер</p>
          </div>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="wa-btn"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="furniture-grid">
          {filteredFurniture.map((item) => (
            <div key={item.id} className="card">
              <div>
                <div className="card-image-wrapper">
                  <img src={item.imageUrl} alt={item.title} className="card-image" />
                  <span className="card-badge">{item.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                </div>
              </div>

              <div className="card-footer">
                <div className="card-price">{item.price.toLocaleString()} сом</div>
                <button
                  onClick={() => handleOrderViaWhatsApp(item)}
                  className="order-btn"
                >
                  Буйрутма берүү (WhatsApp)
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Эмерек Дүйнөсү. Бардык укуктар корголгон.</p>
      </footer>
    </div>
  );
}
