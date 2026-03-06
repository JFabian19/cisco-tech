import React from 'react';
import { ShoppingCart, Menu, X, Monitor, Laptop, Wrench, Cpu } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  selectedCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
}

export function Header({ cartItemCount, onOpenCart, selectedCategory, onSelectCategory }: HeaderProps) {
  const categories: { id: Category | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Todos', icon: <Monitor className="w-4 h-4" /> },
    { id: 'laptops-nuevas', label: 'Laptops Nuevas', icon: <Laptop className="w-4 h-4" /> },
    { id: 'laptops-usadas', label: 'Laptops Usadas', icon: <Laptop className="w-4 h-4" /> },
    { id: 'componentes', label: 'Componentes', icon: <Cpu className="w-4 h-4" /> },
    { id: 'servicios', label: 'Servicios', icon: <Wrench className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-inner shadow-indigo-400/20">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
                Cisco Tech
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase">
                Solution IT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Cart Button */}
          <div className="flex items-center">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
              aria-label="Ver carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full shadow-sm ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Scrollable) */}
      <div className="md:hidden border-t border-slate-100 bg-white/50">
        <div className="flex overflow-x-auto px-4 py-3 space-x-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
