import { useEffect } from 'react';
import { Product } from '../types';
import { MessageCircle, ArrowLeft, CheckCircle2, Package, ShieldCheck } from 'lucide-react';
import { products } from '../data';
import { ProductCard } from './ProductCard';

interface ProductDetailsProps {
    product: Product;
    onBack: () => void;
    onProductSelect: (product: Product) => void;
}

export function ProductDetails({ product, onBack, onProductSelect }: ProductDetailsProps) {
    const relatedProducts = product.relatedIds
        ? products.filter(p => product.relatedIds?.includes(p.id))
        : [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [product]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
            <button
                onClick={onBack}
                className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a los productos
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Imagen del Producto */}
                    <div className="flex justify-center items-center bg-slate-50 rounded-xl overflow-hidden min-h-[400px]">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-xl"
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    {/* Info Principal */}
                    <div className="flex flex-col justify-center">
                        {product.condition && (
                            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full w-max mb-4 uppercase tracking-wider border border-indigo-100">
                                Condición: {product.condition}
                            </span>
                        )}

                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-lg text-slate-600 mb-6">
                            {product.description}
                        </p>

                        <div className="mb-8">
                            <span className="text-5xl font-black text-slate-900 tracking-tight">
                                {product.price === 0 ? 'A consultar' : `S/ ${product.price.toFixed(2)}`}
                            </span>
                            {product.price > 0 && (
                                <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Precio incluye IGV. Emisión de boleta o factura.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 mb-8 border-y border-slate-100 py-6">
                            <div className="flex items-center text-slate-700">
                                <Package className="w-5 h-5 mr-3 text-indigo-400" />
                                <span>Disponible para <strong>recojo en tienda</strong> o <strong>envío a domicilio</strong>.</span>
                            </div>
                            <div className="flex items-center text-slate-700">
                                <ShieldCheck className="w-5 h-5 mr-3 text-indigo-400" />
                                <span>Garantía de tu compra protegida con Cisco Tech.</span>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/51990423217?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-4 focus:ring-green-300"
                        >
                            <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            Pídelo por WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Características completas */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                    Descripción Detallada y Características
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700">
                    <p className="whitespace-pre-line text-lg leading-relaxed mb-8">
                        {product.fullDescription || product.description}
                    </p>

                    {product.specs && product.specs.length > 0 && (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Especificaciones Técnicas</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.specs.map((spec, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-slate-700">{spec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Productos recomendados (Periféricos, etc.) */}
            {relatedProducts.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Te podría interesar también...
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(related => (
                            <ProductCard
                                key={related.id}
                                product={related}
                                onClick={() => onProductSelect(related)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
