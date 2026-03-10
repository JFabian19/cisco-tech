import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: 'Conoce a Richard: Experto en Hardware',
        description: 'Especialista en placas base, microelectrónica y diagnóstico avanzado. Richard es el cofundador de la tienda y se asegura de que cada equipo vuelva a la vida con precisión milimétrica y la mejor calidad de componentes.',
        imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1200',
        tag: 'Nuestro Equipo'
    },
    {
        id: 2,
        title: 'Conoce a Carlos: Maestría en Software',
        description: 'Director técnico y apasionado por la optimización de sistemas. Carlos resuelve al instante problemas de rendimiento, instalaciones complejas, eliminación de virus y recuperación de datos que creías perdidos.',
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
        tag: 'Nuestro Equipo'
    }
];

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 12000); // 12 seconds

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-8">
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl shadow-lg">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-slate-900">
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>

                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12">
                            <span className="bg-indigo-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-1 px-3 rounded-full mb-3 shadow-md">
                                {slide.tag}
                            </span>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-md">
                                {slide.title}
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-slate-100 max-w-2xl drop-shadow">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Navigation Buttons for Desktop (hidden on very small screens) */}
                <button
                    onClick={prevSlide}
                    className="absolute hidden sm:flex left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute hidden sm:flex right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
