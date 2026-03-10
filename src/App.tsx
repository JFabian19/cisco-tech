import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { products as fallbackProducts } from './data';
import { fetchProductsFromSheet } from './services/googleSheets';
import { Category, Product } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Definir la URL de tu hoja de cálculo exportada a CSV aquí o en un archivo .env
      const csvUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL;

      let loadedProducts = fallbackProducts;

      if (csvUrl) {
        try {
          const sheetProducts = await fetchProductsFromSheet(csvUrl);
          if (sheetProducts && sheetProducts.length > 0) {
            loadedProducts = sheetProducts;
          }
        } catch (err) {
          console.error('Error cargando desde Google Sheets, usando productos por defecto:', err);
        }
      }

      setProductList(loadedProducts.filter(p => p.enStock !== false));
      setIsLoading(false);
    }

    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? productList
    : productList.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onProductSelect={setSelectedProduct}
        />
      ) : (
        <>
          <Hero />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {selectedCategory === 'all' && 'Todos los Productos'}
                {selectedCategory === 'laptops-nuevas' && 'Laptops Nuevas'}
                {selectedCategory === 'laptops-usadas' && 'Laptops Usadas'}
                {selectedCategory === 'componentes' && 'Componentes'}
                {selectedCategory === 'servicios' && 'Servicios de Reparación'}
              </h1>
              <p className="text-slate-500 mt-2">
                Encuentra lo mejor en tecnología y servicios profesionales.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">Cargando productos...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No se encontraron productos en esta categoría.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
