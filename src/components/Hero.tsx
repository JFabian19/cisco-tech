import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
    promotions?: string[];
}

export function Hero({ promotions }: HeroProps) {
    const defaultSlides = [
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&q=80&w=1200'
    ];

    const slides = promotions && promotions.length > 0 ? promotions : defaultSlides;

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 12000); // 12 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-6 sm:mb-8 group">
            <div className="relative w-full rounded-xl sm:rounded-2xl shadow-lg overflow-hidden bg-slate-900">
                
                {/* Dummy image to set container height naturally based on the first slide. Ensures 100% responsive aspect ratio without cropping. */}
                <img src={slides[0]} className="w-full h-auto opacity-0 pointer-events-none block" aria-hidden="true" alt="placeholder" />

                {slides.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={imageUrl}
                            alt={`Promoción ${index + 1}`}
                            className="w-full h-full object-cover sm:object-contain"
                        />
                    </div>
                ))}

                {/* Navigation Buttons - Hidden on Mobile */}
                <button
                    onClick={prevSlide}
                    className="absolute hidden sm:flex left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all opacity-70 group-hover:opacity-100"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute hidden sm:flex right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all opacity-70 group-hover:opacity-100"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators - Smaller on Mobile */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

