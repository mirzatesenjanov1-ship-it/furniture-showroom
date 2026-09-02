// production же local чөйрөнү аныктоо
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://furniture-showroom-backend.onrender.com'; // Сиздин чыныгы Render Backend URL дарегиңиз

export { API_URL };

// Кирүү (Login) функциясынын коопсуз жана туруктуу коду
async function handleLogin(email, password) {
  const errorElement = document.getElementById('error-message');
  
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Авторизациядан өтүүдө ката чыкты');
    }

    // Токенди сактоо жана админ панелге багыттоо
    localStorage.setItem('token', data.token);
    window.location.hash = '#/admin/dashboard';
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorElement.innerText = 'Сервер менен байланыш жок! Бэкенд ачык экенин же HTTPS колдонулганын текшериңиз.';
    } else {
      errorElement.innerText = error.message;
    }
  }
}
