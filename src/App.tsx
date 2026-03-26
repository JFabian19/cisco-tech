import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LocationSection } from './components/LocationSection';
import { MarqueeBar } from './components/MarqueeBar';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { ReviewCTA } from './components/ReviewCTA';
import { products as fallbackProducts } from './data';
import { fetchProductsFromSheet } from './services/googleSheets';
import { Category, Product } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const csvUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL;

      let loadedProducts = fallbackProducts;

      if (csvUrl) {
        try {
          const sheetProducts = await fetchProductsFromSheet(csvUrl);
          if (sheetProducts && sheetProducts.length > 0) {
            loadedProducts = sheetProducts.map(sp => {
              const defaultImage = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800';
              if (!sp.imageUrl || sp.imageUrl === defaultImage) {
                const fallback = fallbackProducts.find(fp =>
                  fp.name.toLowerCase() === sp.name.toLowerCase()
                );
                if (fallback && fallback.imageUrl) {
                  return { ...sp, imageUrl: fallback.imageUrl };
                }
              }
              return sp;
            });
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

  // When user selects a category from the grid, show that category's products
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat as Category | 'all');
    setSelectedProduct(null);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go back to the main page (category grid view)
  const handleBackToCategories = () => {
    setSelectedCategory('all');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = selectedCategory === 'all'
    ? productList.filter(p => p.category !== 'promociones')
    : productList.filter(p => p.category === selectedCategory);

  const uniqueCategories = Array.from(new Set<string>(productList.filter(p => p.category !== 'promociones').map(p => p.category)));

  // Check if we're viewing a specific category (not 'all')
  const isViewingCategory = selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Header
        categoriesList={uniqueCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Scrolling Marquee */}
      <MarqueeBar />

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onProductSelect={setSelectedProduct}
        />
      ) : isViewingCategory ? (
        /* Category products view with "Volver" button */
        <>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Back button */}
            <button
              onClick={handleBackToCategories}
              className="group flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0060A9] to-[#0078D4] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Volver a Categorías
            </button>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-slate-500 mt-2">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
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
      ) : (
        /* Main page: Announcement, Promo Carousel, Category Grid */
        <>
          {/* Fixed Announcement Image */}
          <AnnouncementBanner />

          {/* Promotions Carousel */}
          <Hero promotions={productList.filter(p => p.category === 'promociones' && p.imageUrl).map(p => p.imageUrl)} />

          {/* Category Grid */}
          {!isLoading && (
            <CategoryGrid
              categories={uniqueCategories}
              onSelectCategory={handleSelectCategory}
            />
          )}
        </>
      )}

      <ReviewCTA />
      <LocationSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
