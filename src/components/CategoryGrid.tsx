import { Monitor, Laptop, Wrench, Cpu, HardDrive, Bolt, MemoryStick, CircuitBoard } from 'lucide-react';

interface CategoryGridProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

function getIconForCategory(cat: string) {
  if (cat.includes('laptop')) return <Laptop className="w-8 h-8" />;
  if (cat.includes('monitor')) return <Monitor className="w-8 h-8" />;
  if (cat.includes('servicio')) return <Wrench className="w-8 h-8" />;
  if (cat.includes('disco') && cat.includes('duro')) return <HardDrive className="w-8 h-8" />;
  if (cat.includes('disco')) return <HardDrive className="w-8 h-8" />;
  if (cat.includes('fuente')) return <Bolt className="w-8 h-8" />;
  if (cat.includes('memoria') || cat.includes('ram')) return <MemoryStick className="w-8 h-8" />;
  if (cat.includes('placa')) return <CircuitBoard className="w-8 h-8" />;
  if (cat.includes('componente')) return <Cpu className="w-8 h-8" />;
  if (cat.includes('procesador')) return <Cpu className="w-8 h-8" />;
  return <Cpu className="w-8 h-8" />;
}

function getBgImageForCategory(cat: string) {
  // Exact matches based on CSV categories
  if (cat === 'componentes') return '/categories/img_componentes_1774488832994.png';
  if (cat === 'discos-duros') return '/categories/img_discos_1774488848277.png';
  if (cat === 'disco-solido-m.2') return '/categories/img_m2_1774488865203.png';
  if (cat === 'disco-solido-sata') return '/categories/img_sata_1774488880173.png';
  if (cat === 'fuentes-de-poder') return '/categories/img_fuentes_1774488895008.png';
  if (cat === 'laptops-usadas') return '/categories/img_laptops_1774488909625.png';
  if (cat === 'memoria-ram-pc') return '/categories/img_ram_1774488957089.png';
  if (cat === 'monitores') return '/categories/img_monitores_1774488972970.png';
  if (cat === 'placas-amd') return '/categories/img_placa_amd_1774488988189.png';
  if (cat === 'placas-intel') return '/categories/img_placa_intel_1774489004237.png';
  if (cat === 'procesador-amd') return '/categories/img_proc_amd_1774489019225.png';
  if (cat === 'procesador-intel') return '/categories/img_proc_intel_1774489034323.png';
  if (cat === 'servicios') return '/categories/img_servicios_1774489049382.png';
  
  // Generic fallback logic if the exact name isn't found
  if (cat.includes('laptop')) return '/categories/img_laptops_1774488909625.png';
  if (cat.includes('monitor')) return '/categories/img_monitores_1774488972970.png';
  if (cat.includes('servicio')) return '/categories/img_servicios_1774489049382.png';
  if (cat.includes('m.2')) return '/categories/img_m2_1774488865203.png';
  if (cat.includes('sata')) return '/categories/img_sata_1774488880173.png';
  if (cat.includes('disco')) return '/categories/img_discos_1774488848277.png';
  if (cat.includes('fuente')) return '/categories/img_fuentes_1774488895008.png';
  if (cat.includes('memoria') || cat.includes('ram')) return '/categories/img_ram_1774488957089.png';
  if (cat.includes('placa') && cat.includes('amd')) return '/categories/img_placa_amd_1774488988189.png';
  if (cat.includes('placa')) return '/categories/img_placa_intel_1774489004237.png';
  if (cat.includes('procesador') && cat.includes('amd')) return '/categories/img_proc_amd_1774489019225.png';
  if (cat.includes('procesador')) return '/categories/img_proc_intel_1774489034323.png';
  
  return '/categories/img_componentes_1774488832994.png';
}

export function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
          Explora Nuestras Categorías
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base font-medium">
          Selecciona una categoría para ver los productos disponibles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const bgImg = getBgImageForCategory(cat);
          const label = cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`
                group relative overflow-hidden rounded-2xl
                shadow-lg transition-all duration-300 ease-out
                hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-500/20
                active:scale-[0.98]
                min-h-[180px] sm:min-h-[220px]
                cursor-pointer border border-slate-200/50
              `}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={bgImg}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#1e293b]/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col items-center justify-end h-full gap-2 opacity-95 group-hover:opacity-100 items-start w-full mt-auto">
                <div className="flex flex-col items-start text-left gap-1">
                  {/* Icon */}
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors group-hover:scale-110 transition-transform duration-300 mb-1 bg-white/10 p-2.5 rounded-xl backdrop-blur-md shadow-sm border border-white/10">
                    {getIconForCategory(cat)}
                  </div>

                  {/* Label */}
                  <span className="text-white font-extrabold text-lg sm:text-xl leading-tight tracking-wide drop-shadow-md">
                    {label}
                  </span>
                </div>
              </div>

              {/* Subtle arrow indicator */}
              <div className="absolute bottom-5 right-5 text-white/50 group-hover:text-white transition-all group-hover:translate-x-1 duration-300 z-10 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10 group-hover:border-white/30 group-hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
