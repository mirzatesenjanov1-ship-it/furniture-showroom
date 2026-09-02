const API_URL = 'https://furniture-showroom-backend.onrender.com';

async function fetchProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;

  try {
    const response = await fetch(`${API_URL}/api/v1/products`);
    if (!response.ok) return; // Ката болсо HTMLдеги даяр маалыматтар калат

    const products = await response.json();
    if (Array.isArray(products) && products.length > 0) {
      container.innerHTML = products.map(item => `
        <div class="card">
          <img src="${item.imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'}" alt="${item.name}">
          <div class="card-content">
            <div class="card-title">${item.name}</div>
            <div class="card-price">${item.price} сом</div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.log('Бэкенд туташуусу күтүлүүдө, демонстрациялык каталог көрсөтүлүүдө.');
  }
}

document.addEventListener('DOMContentLoaded', fetchProducts);
