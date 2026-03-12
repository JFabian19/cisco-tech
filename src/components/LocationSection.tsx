import { MapPin, Phone, Clock } from 'lucide-react';

export function LocationSection() {
  return (
    <section className="bg-white py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Visítanos en nuestra tienda</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Te esperamos en el corazón del Centro de Lima para brindarte el mejor servicio técnico y asesoría presencial en tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          
          {/* Información de contacto */}
          <div className="p-8 lg:p-12 flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">CiscoTech Solution IT</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-blue-100 p-2 rounded-lg text-blue-600">
                    <MapPin size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">Dirección</h4>
                    <p className="text-slate-600 mt-1">Av. Bolivia 180, Tienda 219<br/>Centro de Lima, Perú</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-green-100 p-2 rounded-lg text-green-600">
                    <Phone size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">Teléfono / WhatsApp</h4>
                    <p className="text-slate-600 mt-1">+51 990 423 217</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-lg text-amber-600">
                    <Clock size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">Horario de Atención</h4>
                    <p className="text-slate-600 mt-1">Lunes a Sábado: 10:00 AM - 8:00 PM</p>
                  </div>
                </li>


              </ul>
            </div>
            
            <a 
                href="https://wa.me/51990423217?text=Hola,%20deseo%20visitar%20su%20tienda%20en%20el%20Centro%20de%20Lima"
                target="_blank"
                rel="noopener noreferrer" 
                className="mt-4 inline-block w-full text-center bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
                Agendar una visita
            </a>
          </div>

          {/* Mapa de Google iframe */}
          <div className="h-96 lg:h-auto min-h-[400px] w-full relative group">
            <div className="absolute inset-0 bg-slate-200 animate-pulse -z-10"></div>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d3922.1470122450933!2d-77.03823050611082!3d-12.05554336105105!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c90020e49d61%3A0x8e97b9f793caea0b!2sCiscoTech%20Solution%20TI!5e1!3m2!1ses-419!2spe!4v1773283062238!5m2!1ses-419!2spe" 
                className="w-full h-full border-0 group-hover:opacity-95 transition-opacity duration-300" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
