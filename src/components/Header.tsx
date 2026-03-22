import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Laptop, Wrench, Cpu, HardDrive, Bolt, ChevronDown } from 'lucide-react';

interface HeaderProps {
  categoriesList: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function Header({ categoriesList, selectedCategory, onSelectCategory }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIconForCategory = (cat: string) => {
    if (cat.includes('laptop')) return <Laptop className="w-4 h-4" />;
    if (cat.includes('monitor')) return <Monitor className="w-4 h-4" />;
    if (cat.includes('servicio')) return <Wrench className="w-4 h-4" />;
    if (cat.includes('disco')) return <HardDrive className="w-4 h-4" />;
    if (cat.includes('fuentes')) return <Bolt className="w-4 h-4" />;
    return <Cpu className="w-4 h-4" />;
  };

  const formattedCategories = [
    { id: 'all', label: 'Todos los productos', icon: <Monitor className="w-4 h-4" /> },
    ...categoriesList.map(c => ({
      id: c,
      label: c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      icon: getIconForCategory(c)
    }))
  ];

  const currentCatLabel = formattedCategories.find(c => c.id === selectedCategory)?.label || 'Categorías';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm relative">
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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shadow-sm"
            >
              <Monitor className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline sm:max-w-xs truncate">{currentCatLabel}</span>
              <span className="sm:hidden">Catálogo</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-50 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Explorar Catálogo
                </div>
                {formattedCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${selectedCategory === cat.id
                        ? 'bg-indigo-50 text-indigo-700 font-semibold border-l-2 border-indigo-600'
                        : 'text-slate-600 border-l-2 border-transparent'
                      }`}
                  >
                    <span className={`${selectedCategory === cat.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
