import { useState } from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, ShoppingBag, MapPin, Navigation } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const DELIVERY_ZONES = [
  { id: 'tienda', name: 'Recojo en tienda', price: 0 },
  { id: 'zona-cercado', name: 'Envío - Cercado (S/ 5.00)', price: 5 },
  { id: 'zona-norte', name: 'Envío - Zona Norte (S/ 10.00)', price: 10 },
  { id: 'zona-sur', name: 'Envío - Zona Sur (S/ 15.00)', price: 15 },
  { id: 'zona-este', name: 'Envío - Zona Este (S/ 12.00)', price: 12 },
];

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_ZONES[0].id);
  const [address, setAddress] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const selectedZone = DELIVERY_ZONES.find(z => z.id === deliveryMethod) || DELIVERY_ZONES[0];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal + selectedZone.price;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAddress(`Ubicación GPS: https://maps.google.com/?q=${latitude},${longitude}`);
        setIsGettingLocation(false);
      },
      (error) => {
        alert('No pudimos acceder a tu ubicación. Por favor, escribe tu dirección manualmente.');
        setIsGettingLocation(false);
      }
    );
  };

  const handleWhatsAppCheckout = () => {
    if (selectedZone.id !== 'tienda' && !address.trim()) {
      alert('Por favor, ingresa tu dirección de envío o comparte tu ubicación.');
      return;
    }

    const phoneNumber = '1234567890'; // Replace with actual business number

    let locationText = 'Recojo en tienda';
    if (selectedZone.id !== 'tienda') {
      locationText = `Envío a domicilio contra entrega (${selectedZone.name})\nDirección: ${address}`;
    }

    const message = `¡Hola Cisco Tech Solution IT! Me gustaría hacer el siguiente pedido:\n\n${items
      .map((item) => `- ${item.quantity}x ${item.product.name} (${item.product.price === 0 ? 'A consultar' : `S/ ${(item.product.price * item.quantity).toFixed(2)}`})`)
      .join('\n')}\n\nSubtotal: S/ ${subtotal.toFixed(2)}\nEnvío: S/ ${selectedZone.price.toFixed(2)}\n*Total a pagar: S/ ${total.toFixed(2)}*\n\n*Método de entrega:*\n${locationText}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            Tu Carrito
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <button
                onClick={onClose}
                className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 line-clamp-2 text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-indigo-600 font-semibold mt-1">
                        {item.product.price === 0 ? 'A consultar' : `S/ ${item.product.price.toFixed(2)}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Opciones de entrega</label>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              >
                {DELIVERY_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
            </div>

            {selectedZone.id !== 'tienda' && (
              <div className="flex flex-col gap-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-200">
                <label className="text-sm font-semibold text-slate-700">Dirección de envío</label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Escribe tu dirección, o pega un enlace de Maps..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
                ></textarea>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500">¿No tienes la dirección exacta?</span>
                  <button
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    <Navigation className="w-3.5 h-3.5 mr-1" />
                    {isGettingLocation ? 'Obteniendo...' : 'Usar mi ubicación actual'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1 mt-2">
              <div className="flex justify-between items-center text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 text-sm">
                <span>Envío</span>
                <span>{selectedZone.price === 0 ? 'Gratis' : `S/ ${selectedZone.price.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-900">Total a Pagar</span>
                <span className="text-xl font-bold text-slate-900">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-emerald-500/20 mt-2"
            >
              <WhatsAppIcon />
              Pedir por WhatsApp
            </button>
            <p className="text-xs text-center text-slate-400">
              {selectedZone.id === 'tienda' ? 'Serás redirigido a WhatsApp para coordinar tu recojo.' : 'Paga al recibir. Serás redirigido a WhatsApp para confirmar tu envío.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
