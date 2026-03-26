interface AnnouncementBannerProps {
  imageUrl?: string;
}

export function AnnouncementBanner({ imageUrl }: AnnouncementBannerProps) {
  const src = imageUrl || '/baner google.png';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
      <div className="relative w-full rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-slate-200/50 bg-white">
        <img
          src={src}
          alt="Anuncio destacado"
          className="w-full h-auto object-cover"
        />
        {/* Subtle gradient overlay at bottom for elegance */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0060A9] via-[#0078D4] to-[#0060A9]" />
      </div>
    </div>
  );
}
