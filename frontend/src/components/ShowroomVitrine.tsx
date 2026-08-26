import React, { useState } from 'react';
import { generateWhatsAppLink } from '../utils/whatsapp';

interface ShowcaseItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  dimensions: string;
  material: string;
  description: string;
  imageUrl: string;
}

interface VitrineProps {
  items: ShowcaseItem[];
  whatsappNumber: string;
}

export const ShowroomVitrine: React.FC<VitrineProps> = ({ items, whatsappNumber }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items.length) return null;
  const item = items[currentIndex];

  return (
    <section className="relative w-full bg-stone-900 text-amber-50 rounded-2xl overflow-hidden shadow-2xl my-6 border border-amber-900/20">
      {/* Background Subtle Wood Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#332211_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Main Product Display Area */}
        <div className="lg:col-span-7 relative flex items-center justify-center bg-stone-950/60 p-6">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[440px] w-auto object-contain transition-all duration-700 ease-in-out hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-stone-300">
            Эксклюзивдүү модель
          </div>
        </div>

        {/* Content Details */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-stone-900/90 backdrop-blur-md">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-900/40 text-amber-400 border border-amber-700/50 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
              Шоурум Витринасы
            </span>
            <h1 className="text-3xl font-serif font-bold text-amber-100 mb-3">{item.title}</h1>
            <p className="text-stone-300 text-sm mb-6 line-clamp-3 leading-relaxed">{item.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 border-y border-stone-800 py-4 text-xs">
              <div>
                <span className="text-stone-400 block">Өлчөмү:</span>
                <span className="font-semibold text-stone-200">{item.dimensions}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Материал:</span>
                <span className="font-semibold text-stone-200">{item.material}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-amber-400 mb-6">
              {item.price.toLocaleString()} <span className="text-lg font-normal text-amber-200">сом</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/furniture/${item.slug}`}
              className="flex-1 text-center py-3.5 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-100 font-medium transition-colors"
            >
              Толук көрүү
            </a>
            <a
              href={generateWhatsAppLink(whatsappNumber, item)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              WhatsApp аркылуу заказ
            </a>
          </div>

          {/* Carousel Controls */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-stone-800">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-stone-700'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
