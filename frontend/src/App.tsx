import React, { useState } from 'react';
import { Globe, MessageCircle, Search, SlidersHorizontal, Shield } from 'lucide-react';
import { Language, translations } from './i18n';
import { AdsterraBanner } from './components/AdsterraBanner';

interface Product {
  id: string;
  title: string;
  price: number;
  material: string;
  dimensions: string;
  image: string;
  category: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Премиум Конок Диваны',
    price: 85000,
    material: 'Италиялык Велюр, Карагач',
    dimensions: '240 x 100 x 85 см',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000',
    category: 'Дивандар'
  },
  {
    id: '2',
    title: 'Люкс Тамактануу Столу',
    price: 120000,
    material: 'Табигый Мрамор, Мет. Каркас',
    dimensions: '200 x 100 x 75 см',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1000',
    category: 'Столдор'
  },
  {
    id: '3',
    title: 'Минималистик Кровать',
    price: 95000,
    material: 'Эко-булгаары, Дуб',
    dimensions: '180 x 200 см',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000',
    category: 'Кроваттар'
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('ky');
  const [search, setSearch] = useState('');
  const t = translations[lang];

  const handleWhatsAppOrder = (product: Product) => {
    const phone = "996706035765";
    const currentUrl = window.location.href;
    const text = `Саламатсызбы! Мен ушул эмеректи заказ кылайын дедим эле:\n\n` +
      `🛋️ *${product.title}*\n` +
      `💰 Баасы: ${product.price.toLocaleString()} KGS\n` +
      `📏 Өлчөмү: ${product.dimensions}\n` +
      `🧵 Материалы: ${product.material}\n` +
      `🔗 Шилтеме: ${currentUrl}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20">
              F
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              LUXE FURNITURE
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher Button */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <Globe className="w-4 h-4 text-amber-400 ml-2 mr-1" />
              {(['ky', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase transition-all ${
                    lang === l
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <a
              href="https://wa.me/996706035765"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">+996 706 035 765</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showcase Background */}
      <section className="relative py-24 px-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-2xl backdrop-blur"
            />
          </div>
        </div>
      </section>

      {/* Adsterra Top Monetization */}
      <div className="max-w-7xl mx-auto px-4">
        <AdsterraBanner type="banner" />
      </div>

      {/* Product Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-400" />
          {t.catalogTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/30">
                  {p.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                
                <div className="space-y-1 mb-4 text-sm text-slate-400">
                  <p><span className="text-slate-500">{t.material}:</span> {p.material}</p>
                  <p><span className="text-slate-500">{t.dimensions}:</span> {p.dimensions}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-500 block">{t.price}</span>
                    <span className="text-xl font-extrabold text-amber-400">
                      {p.price.toLocaleString()} KGS
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(p)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-950/50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adsterra Native Monetization */}
        <AdsterraBanner type="native" />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-20 py-10 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 LUXE FURNITURE. Бардык укуктар корголгон.</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-amber-400" />
            Коопсуз HTTPS туташуусу
          </div>
        </div>
      </footer>
    </div>
  );
}
