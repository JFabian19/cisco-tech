export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4 opacity-90">
                            <img src="/logo.png" alt="Cisco Tech Logo" className="h-8 w-auto object-contain" />
                            <div className="flex flex-col justify-center">
                                <span className="font-black text-lg tracking-tighter text-white leading-none">
                                    CiscoTech
                                </span>
                                <span className="text-[9px] font-bold tracking-[0.2em] text-[#3b82f6] uppercase leading-tight mt-0.5">
                                    Solution IT
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 max-w-xs">
                            Tu aliado estratégico en tecnología. Laptops, componentes y servicio técnico de alta calidad y con garantía.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-2 text-sm">
                            <li>WhatsApp: +51 990 423 217</li>
                            <li>Soporte técnico y ventas.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Catálogo</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Servicios</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center text-slate-500">
                    Obtén la mejor tecnología con Cisco Tech. © {new Date().getFullYear()} Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
