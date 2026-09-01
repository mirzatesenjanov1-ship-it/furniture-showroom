import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

export const AdminPanel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Форманын талаалары
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDesc: '',
    price: '',
    material: '',
    dimensions: '',
    categoryId: '',
    imageUrl: '',
  });

  // Категорияларды базадан алуу
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Категорияларды жүктөөдө ката:', err);
    }
  };

  // Автоматтык түрдө Slug жаратуу (мисалы: "Жумшак Диван" -> "zhumshak-divan")
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w\-]+/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: generatedSlug,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Жаңы эмеректи базага жөнөтүү
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch('/api/admin/furniture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          images: formData.imageUrl ? [{ url: formData.imageUrl, isPrimary: true }] : [],
        }),
      });

      if (!response.ok) {
        throw new Error('Эмеректи кошууда ката чыкты.');
      }

      setMessage({ text: 'Эмерек ийгиликтүү кошулду!', type: 'success' });
      // Форманы тазалоо
      setFormData({
        title: '',
        slug: '',
        description: '',
        shortDesc: '',
        price: '',
        material: '',
        dimensions: '',
        categoryId: '',
        imageUrl: '',
      });
    } catch (err: any) {
      setMessage({ text: err.message || 'Ката катталды.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Жаңы Эмерек Кошуу</h2>

      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Аты */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Аталышы (Title)</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              required
              placeholder="Мисалы: Офис столу"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="ofis-stolu"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Баасы */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Баасы (сом)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="15000"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Категориясы</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Категорияны тандаңыз</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Материалы */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Материалы</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
              placeholder="Эмен жыгачы, Металл"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Өлчөмдөрү */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Өлчөмдөрү (Dimensions)</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              required
              placeholder="120x60x75 см"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Сүрөт URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Сүрөттүн шилтемеси (Image URL)</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://images.unsplash.com/photo-..."
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Кыскача сүрөттөмө */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Кыскача сүрөттөмө</label>
          <input
            type="text"
            name="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            placeholder="Премиум сапаттагы жумуш столу"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Толук сүрөттөмө */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Толук сүрөттөмө</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Эмерек тууралуу толук маалымат..."
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Сакталууда...' : 'Эмеректи базага кошуу'}
        </button>
      </form>
    </div>
  );
};
