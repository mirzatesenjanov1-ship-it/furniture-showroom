import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Phone } from 'lucide-react';

interface HeaderProps {
  whatsappNumber: string;
}

export const Header: React.FC<HeaderProps> = ({ whatsappNumber }) => {
  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-amber-200 tracking-wide">
          <ShoppingBag className="w-7 h-7 text-amber-500" />
          <span>МЕБЕЛЬ ВИТРИНА</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <Link to="/" className="hover:text-amber-400 transition-colors">Башкы бет</Link>
          <Link to="/catalog" className="hover:text-amber-400 transition-colors">Каталог</Link>
          <Link to="/custom-order" className="hover:text-amber-400 transition-colors">Өз өлчөмүң менен</Link>
          <Link to="/about" className="hover:text-amber-400 transition-colors">Биз жөнүндө</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold tracking-wider transition-all shadow-md shadow-emerald-950/40"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button className="md:hidden p-2 text-stone-300 hover:text-white" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};
