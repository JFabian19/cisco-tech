import React from 'react';
import { Menu, X, Monitor, Laptop, Wrench, Cpu } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  selectedCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
}

export function Header({ selectedCategory, onSelectCategory }: HeaderProps) {
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
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => onSelectCategory('all')}>
            <img src="/logo.png" alt="Cisco Tech Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col justify-center">
              <span className="font-black text-xl tracking-tighter text-slate-800 leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                CiscoTech
              </span>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0060A9] uppercase leading-tight mt-0.5">
                Solution TI
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${selectedCategory === cat.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation (Scrollable) */}
      <div className="md:hidden border-t border-slate-100 bg-white/50">
        <div className="flex overflow-x-auto px-4 py-3 space-x-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${selectedCategory === cat.id
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
    </header >
  );
}
