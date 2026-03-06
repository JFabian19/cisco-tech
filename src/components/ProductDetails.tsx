import { useEffect } from 'react';
import { Product } from '../types';
import { ShoppingCart, ArrowLeft, CheckCircle2, Package, ShieldCheck } from 'lucide-react';
import { products } from '../data';
import { ProductCard } from './ProductCard';

interface ProductDetailsProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (product: Product) => void;
    onProductSelect: (product: Product) => void;
}

export function ProductDetails({ product, onBack, onAddToCart, onProductSelect }: ProductDetailsProps) {
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

                        <button
                            onClick={() => onAddToCart(product)}
                            className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-300"
                        >
                            <ShoppingCart className="mr-2 w-6 h-6" />
                            Añadir al Carrito
                        </button>
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
                                onAddToCart={onAddToCart}
                                onClick={() => onProductSelect(related)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
