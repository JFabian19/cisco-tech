import { Star, ExternalLink } from 'lucide-react';

export function ReviewCTA() {
  const reviewUrl = 'https://g.page/r/CQvqypP3uZeOEBM/review';

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0060A9] via-[#0078D4] to-[#00A3E0]" />
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/[0.02] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stars row */}
        <div className="flex justify-center gap-1.5 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={32}
              className="text-amber-400 fill-amber-400 drop-shadow-md animate-pulse"
              style={{ animationDelay: `${i * 150}ms`, animationDuration: '2.5s' }}
            />
          ))}
        </div>

        {/* Google icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-white rounded-full p-3 shadow-lg shadow-black/10">
            <svg viewBox="0 0 24 24" width="36" height="36">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          ¿Te gustó nuestro servicio?
        </h2>

        {/* Subtitle */}
        <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Tu opinión es muy importante para nosotros. Déjanos una reseña en Google y ayúdanos a seguir mejorando. ¡Solo toma un minuto!
        </p>

        {/* CTA Button */}
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-[#0060A9] font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group"
        >
          <Star size={22} className="text-amber-500 fill-amber-500 group-hover:rotate-[20deg] transition-transform duration-300" />
          Dejar mi opinión en Google
          <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </a>

        {/* Trust text */}
        <p className="text-blue-200/70 text-sm mt-6">
          Serás redirigido a Google Maps para escribir tu reseña
        </p>
      </div>
    </section>
  );
}
