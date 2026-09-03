import React, { useState, useEffect, useRef } from 'react';

interface Furniture {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

const WHATSAPP_NUMBER = "996706035765";
const PASS_HASH = "bWlyemF0MTQwNTE5OTk="; 

const defaultFurniture: Furniture[] = [
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

const AdsterraBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.text = `
        atOptions = {
          'key' : '230e338703bb44150336cce1f0832fe3',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/230e338703bb44150336cce1f0832fe3/invoke.js';

      bannerRef.current.appendChild(confScript);
      bannerRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0', overflow: 'hidden' }}>
      <div ref={bannerRef}></div>
    </div>
  );
};

export default function App() {
  const [furnitureList, setFurnitureList] = useState<Furniture[]>(() => {
    const saved = localStorage.getItem('furniture_items');
    return saved ? JSON.parse(saved) : defaultFurniture;
  });

  const [selectedCategory, setSelectedCategory] = useState("Баары");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Конок бөлмө");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  // F12 жана Коргоо
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Adsterra Social Bar
  useEffect(() => {
    const socialBarScript = document.createElement('script');
    socialBarScript.type = 'text/javascript';
    socialBarScript.src = 'https://pl30202824.effectivecpmnetwork.com/2a/5b/af/2a5bafdd419add82a1af8ec0def99355.js';
    socialBarScript.async = true;

    document.body.appendChild(socialBarScript);

    return () => {
      document.body.removeChild(socialBarScript);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('furniture_items', JSON.stringify(furnitureList));
  }, [furnitureList]);

  // Google Издөө системалары үчүн Автоматтык SEO Schema (Structured Data)
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      "itemListElement": furnitureList.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": item.title,
          "image": item.imageUrl,
          "description": item.description,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "KGS",
            "price": item.price,
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    };

    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [furnitureList]);

  const handleAdminLogin = () => {
    if (isAdminLoggedIn) {
      setIsAdminLoggedIn(false);
    } else {
      const pass = prompt("Админ сырсөзүн киргизиңиз:");
      if (pass && btoa(pass) === PASS_HASH) {
        setIsAdminLoggedIn(true);
      } else if (pass !== null) {
        alert("Сырсөз туура эмес!");
      }
    }
  };

  const handleAddFurniture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newImageUrl) {
      alert("Сураныч, аталышын, баасын жана сүрөт шилтемесин толтуруңуз!");
      return;
    }

    const newItem: Furniture = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      description: newDescription,
      imageUrl: newImageUrl
    };

    setFurnitureList([newItem, ...furnitureList]);
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewImageUrl("");
    alert("Жаңы эмерек ийгиликтүү кошулду!");
  };

  const handleDeleteFurniture = (id: number) => {
    if (confirm("Чын эле бул эмеректи өчүргүңүз келеби?")) {
      setFurnitureList(furnitureList.filter(item => item.id !== id));
    }
  };

  // Фильтр жана Издөө логикасы
  const filteredFurniture = furnitureList
    .filter(item => selectedCategory === "Баары" || item.category === selectedCategory)
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      return 0;
    });

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
          <div className="header-actions">
            <button onClick={handleAdminLogin} className="admin-btn">
              {isAdminLoggedIn ? "Админден чыгуу" : "Админ панель"}
            </button>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="wa-btn"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <AdsterraBanner />

        {isAdminLoggedIn && (
          <div className="admin-panel">
            <h2 className="admin-title">Жаңы эмерек кошуу</h2>
            <form onSubmit={handleAddFurniture} className="admin-form">
              <input 
                type="text" 
                placeholder="Эмеректин аталышы (мисалы: Жумшак Диван)" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                className="admin-input"
              />
              <select 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)}
                className="admin-select"
              >
                {categories.filter(c => c !== "Баары").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input 
                type="number" 
                placeholder="Баасы (сом менен)" 
                value={newPrice} 
                onChange={(e) => setNewPrice(e.target.value)} 
                className="admin-input"
              />
              <input 
                type="text" 
                placeholder="Сүрөттүн шилтемеси (URL)" 
                value={newImageUrl} 
                onChange={(e) => setNewImageUrl(e.target.value)} 
                className="admin-input"
              />
              <textarea 
                placeholder="Кошумча сыпаттамасы (Google издөөдө оңой табуу үчүн баяндоо жазыңыз)" 
                value={newDescription} 
                onChange={(e) => setNewDescription(e.target.value)} 
                className="admin-textarea"
                rows={3}
              />
              <button type="submit" className="admin-submit-btn">Сайтка кошуу</button>
            </form>
          </div>
        )}

        {/* Издөө жана Сортировка панели */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Эмеректи издөө..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input"
            style={{ flex: 1, minWidth: '200px' }}
          />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="admin-select"
            style={{ width: 'auto', minWidth: '180px' }}
          >
            <option value="default">Иреттелиши (дефолт)</option>
            <option value="low-to-high">Баасы: Арзандан кымбатка</option>
            <option value="high-to-low">Баасы: Кымбаттан арзанга</option>
          </select>
        </div>

        {/* Категориялар */}
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

        {/* Эмеректер витринасы */}
        <div className="furniture-grid">
          {filteredFurniture.length > 0 ? (
            filteredFurniture.map((item) => (
              <div key={item.id} className="card">
                <div>
                  <div className="card-image-wrapper">
                    <img src={item.imageUrl} alt={`${item.title} - Эмерек Дүйнөсү`} className="card-image" />
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
                  {isAdminLoggedIn && (
                    <button 
                      onClick={() => handleDeleteFurniture(item.id)}
                      className="delete-btn"
                    >
                      Өчүрүү
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
              Тилекке каршы, мындай эмерек табылган жок.
            </div>
          )}
        </div>

        <AdsterraBanner />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Эмерек Дүйнөсү. Бардык укуктар корголгон.</p>
      </footer>
    </div>
  );
}
