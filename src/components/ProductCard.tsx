import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full ${onClick ? 'cursor-pointer hover:border-indigo-100' : ''}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-50 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm border border-slate-200/50">
          {product.category === 'laptops-nuevas' && 'Nueva'}
          {product.category === 'laptops-usadas' && 'Usada'}
          {product.category === 'componentes' && 'Componente'}
          {product.category === 'servicios' && 'Servicio'}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {product.specs && product.specs.length > 0 && (
          <div className="mb-4">
            <ul className="text-xs text-slate-400 space-y-1">
              {product.specs.slice(0, 3).map((spec, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1 h-1 bg-slate-300 rounded-full mr-2"></span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <span className="text-xl font-bold text-slate-900">
            {product.price === 0 ? 'A consultar' : `S/ ${product.price.toFixed(2)}`}
          </span>
          <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Ver detalles &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
