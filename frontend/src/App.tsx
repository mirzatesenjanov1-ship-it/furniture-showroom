import React, { useState } from 'react';
import { Globe, MessageCircle, Search, SlidersHorizontal, Shield, Sparkles, PhoneCall } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('Бардыгы');
  const t = translations[lang];

  const categories = ['Бардыгы', 'Дивандар', 'Столдор', 'Кроваттар'];

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Бардыгы' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 transform hover:rotate-6 transition-transform">
              F
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-white block leading-none">
                LUXE <span className="text-amber-400">FURNITURE</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">Showroom Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/80 shadow-inner">
              <Globe className="w-4 h-4 text-amber-400 ml-2 mr-1 hidden sm:block" />
              {(['ky', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-200 ${
                    lang === l
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Direct WhatsApp Call Button */}
            <a
              href="https://wa.me/996706035765"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden md:inline">+996 706 035 765</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6 text-xs font-medium text-amber-400 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Премиум Сапат & Эксклюзив Стил
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-2xl backdrop-blur transition-all"
            />
          </div>
        </div>
      </section>

      {/* Adsterra Top Banner */}
      <div className="max-w-7xl mx-auto px-4">
        <AdsterraBanner type="banner" />
      </div>

      {/* Main Showcase Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <SlidersHorizontal className="w-6 h-6 text-amber-400" />
            {t.catalogTitle}
          </h2>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-slate-900/90 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col"
            >
              <div className="relative h-72 overflow-hidden bg-slate-950">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/20">
                  {p.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6 text-xs text-slate-400 border-l-2 border-amber-500/30 pl-3">
                    <p><span className="text-slate-500 font-medium">{t.material}:</span> {p.material}</p>
                    <p><span className="text-slate-500 font-medium">{t.dimensions}:</span> {p.dimensions}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">{t.price}</span>
                    <span className="text-xl font-black text-amber-400">
                      {p.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">KGS</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(p)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Заказ кылуу
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adsterra Native Monetization Zone */}
        <AdsterraBanner type="native" />
      </main>

      {/* Bottom Floating WhatsApp Banner for Usability */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/996706035765"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:bg-emerald-400 hover:scale-105 transition-all font-bold text-sm"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Кеңеш алуу (WhatsApp)</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 mt-20 py-8 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 LUXE FURNITURE. Бардык укуктар корголгон.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-4 h-4 text-amber-400" />
            Коопсуз HTTPS байланышы
          </div>
        </div>
      </footer>
    </div>
  );
}
