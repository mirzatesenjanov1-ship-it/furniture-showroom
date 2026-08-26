import React, { useState } from 'react';
import { generateWhatsAppLink, FurnitureOrderData } from '../utils/whatsapp';

interface VitrineProps {
  items: Array<FurnitureOrderData & { description: string; imageUrl: string }>;
  whatsappNumber: string;
}

export const ShowroomVitrine: React.FC<VitrineProps> = ({ items, whatsappNumber }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items.length) return null;
  const item = items[currentIndex];

  return (
    <section className="relative w-full bg-stone-950 text-amber-50 rounded-2xl overflow-hidden shadow-2xl border border-amber-900/30 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Showcase Image */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-8 bg-stone-900/40">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[420px] w-auto object-contain transition-all duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-amber-900/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-amber-300 border border-amber-700/40">
            ШОУРУМ ВИТРИНАСЫ
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-stone-900/80 backdrop-blur-md">
          <div>
            <h2 className="text-3xl font-serif font-bold text-amber-100 mb-3">{item.title}</h2>
            <p className="text-stone-300 text-sm mb-6 leading-relaxed line-clamp-3">{item.description}</p>

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
              {Number(item.price).toLocaleString()} <span className="text-base font-normal text-amber-200">сом</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/furniture/${item.slug}`}
              className="flex-1 text-center py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-100 text-sm font-medium transition-colors"
            >
              Толук көрүү
            </a>
            <a
              href={generateWhatsAppLink(whatsappNumber, item)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              WhatsApp Заказ
            </a>
          </div>

          {/* Controls */}
          {items.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
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
