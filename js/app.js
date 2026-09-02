// Production бэкенд же локалдык API URL
const API_URL = 'https://furniture-showroom-backend.onrender.com';

async function loadProducts() {
  const contentEl = document.getElementById('content');
  if (!contentEl) return;

  try {
    const response = await fetch(`${API_URL}/api/v1/products`);
    if (!response.ok) throw new Error('Серверден маалымат алууда ката чыкты');
    
    const products = await response.json();
    
    if (products.length === 0) {
      contentEl.className = 'error';
      contentEl.innerHTML = 'Каталогдо азырынча эмеректер жок.';
      return;
    }

    renderProducts(products);
  } catch (err) {
    console.warn('Backend туташпады, үлгү маалыматтар көрсөтүлүүдө:', err);
    // Сервер туташпай калса, кара экран чыкпашы үчүн Fallback үлгү маалыматтар
    renderProducts([
      { id: 1, title: 'Заманбап Диван', price: '45,000 сом', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500' },
      { id: 2, title: 'Жыгач Үстөл', price: '18,000 сом', image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500' }
    ]);
  }
}

function renderProducts(items) {
  const contentEl = document.getElementById('content');
  contentEl.className = 'grid';
  contentEl.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.image || 'https://via.placeholder.com/300'}" alt="${item.title}">
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div class="card-price">${item.price}</div>
      </div>
    </div>
  `).join('');
}

// Баракча жүктөлгөндө чакыруу
document.addEventListener('DOMContentLoaded', loadProducts);
