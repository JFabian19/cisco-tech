import { Product } from './types';

export const products: Product[] = [
  // Productos de la imagen (fallback)
  {
    id: 'lu-img-1',
    name: 'HP Elitebook 840 G4',
    description: 'Procesador Intel core i5 de octava generación, memoria ram de 8gb, disco sólido de 240gb, pantalla HD de 14".',
    price: 900.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i5 8th Gen', '8GB RAM', '240GB SSD', '14" HD'],
    condition: 'Usado',
    enStock: true
  },
  {
    id: 'lu-img-2',
    name: 'Lenovo Thinkpad E14',
    description: 'Procesador core i7 de decima generación, memoria ram de 16gb, disco sólido M.2 de 512gb, tarjeta de video dedicado de 2Gb, pantalla FHD de 14".',
    price: 1200.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i7 10th Gen', '16GB RAM', '512GB M.2 SSD', 'Video 2GB', '14" FHD'],
    condition: 'Usado',
    enStock: true
  },
  {
    id: 'lu-img-3',
    name: 'Lenovo Thinkpad X1 Carbón',
    description: 'Procesador Intel core i7 de sexta generación, memoria ram de 16gb, disco sólido M.2 de 256Gb, pantalla FHD de 14".',
    price: 850.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i7 6th Gen', '16GB RAM', '256GB M.2 SSD', '14" FHD'],
    condition: 'Usado',
    enStock: true
  },
  {
    id: 'lu-img-4',
    name: 'Laptop Lenovo Ideapad GAMING',
    description: 'Procesador core i5 de décima generación, memoria ram de 16gb, disco sólido de 250gb + disco duro de 1Tb, pantalla FHD de 15.6", teclado iluminado, tarjeta de video dedicado GTX1650 de 4GB.',
    price: 1800.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i5 10th Gen', '16GB RAM', '250GB SSD + 1TB HDD', 'GTX1650 4GB', '15.6" FHD'],
    condition: 'Usado',
    enStock: true
  },
  {
    id: 'lu-img-5',
    name: 'HP Elitebook 640',
    description: 'Procesador core i5 de octava generación, memoria ram de 8gb, disco sólido m.2. 256gb, pantalla de 14".',
    price: 950.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i5 8th Gen', '8GB RAM', '256GB M.2 SSD', '14"'],
    condition: 'Usado',
    enStock: true
  },
  {
    id: 'ln-1',
    name: 'Dell XPS 15 (2024)',
    description: 'Laptop premium para profesionales y creadores de contenido.',
    fullDescription: 'La Dell XPS 15 es la laptop perfecta para diseñadores, editores de video y creativos. Con su asombrosa pantalla OLED 4K y un procesador Intel Core i7 de 13ª generación, ofrece un rendimiento extraordinario para las tareas más pesadas. Su elegante cuerpo de aluminio mecanizado CNC y el reposamanos de fibra de carbono garantizan durabilidad y poco peso.',
    price: 7200.00,
    category: 'laptops-nuevas',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i7 13th Gen', '16GB RAM', '512GB SSD', '15.6" OLED 4K', 'Windows 11 Pro', 'TDP 45W'],
    condition: 'Sellado',
    relatedIds: ['comp-1', 'serv-2'],
    enStock: true
  },
  {
    id: 'ln-2',
    name: 'MacBook Pro 14" M3',
    description: 'Potencia y eficiencia inigualable con el chip M3 Pro.',
    fullDescription: 'Descubre en la MacBook Pro de 14 pulgadas un mundo de posibilidades gracias al chip M3 Pro de Apple. Procesa gráficos pesados, compila código y edita vídeo sin interrupciones con una batería que dura todo el día. Disfruta de la vibrante pantalla Liquid Retina XDR con un contraste impresionante.',
    price: 7600.00,
    category: 'laptops-nuevas',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    specs: ['Apple M3 Pro', '18GB Unified Memory', '512GB SSD', '14.2" Liquid Retina XDR', 'Teclado Magic Keyboard Español'],
    condition: 'Nuevo',
    relatedIds: ['serv-2']
  },
  {
    id: 'ln-3',
    name: 'Lenovo ThinkPad X1 Carbon',
    description: 'La mejor laptop empresarial, ultraligera y resistente.',
    fullDescription: 'Lidera tu negocio con la legendaria durabilidad de la familia ThinkPad. El modelo X1 Carbon ofrece rendimiento top con un chasis que aguanta certificaciones de grado militar. Además, incluye herramientas de seguridad avanzadas como el lector de huellas match-on-chip y certificación de ThinkShield.',
    price: 5500.00,
    category: 'laptops-nuevas',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i5 13th Gen', '16GB RAM', '256GB SSD', '14" WUXGA', 'Certificación MIL-STD 810H'],
    condition: 'Nuevo',
    relatedIds: ['comp-1', 'serv-2']
  },
  {
    id: 'lu-1',
    name: 'HP EliteBook 840 G6 (Usada)',
    description: 'Excelente estado, ideal para estudiantes y trabajo de oficina.',
    fullDescription: 'Equipo de serie empresarial reacondicionado que garantiza confiabilidad a un super precio. Ideal para profesionales independientes y universitarios. Excelente recorrido del teclado, panel antibrillo y chasis de aluminio. Todo fue probado exhaustivamente y se encuentra en óptimas condiciones.',
    price: 1400.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i5 8th Gen', '8GB RAM', '256GB SSD', '14" FHD', 'Windows 10 Pro'],
    condition: 'Como Nuevo',
    relatedIds: ['comp-1', 'serv-1', 'serv-2']
  },
  {
    id: 'lu-2',
    name: 'Dell Latitude 7400 (Usada)',
    description: 'Batería nueva, rendimiento sólido para el día a día.',
    fullDescription: 'Una laptop usada pero con la batería recién reemplazada. Posee una gran relación calidad/precio con un potente procesador i7 de octava generación y 16GB de memoria RAM, ideal para tener bastantes ventanas abiertas sin sufrir ralentizaciones. Se le aplicó pasta térmica premium y está lista para arrancar.',
    price: 1600.00,
    category: 'laptops-usadas',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i7 8th Gen', '16GB RAM', '512GB SSD', '14" FHD', 'Batería Nueva'],
    condition: 'Usado',
    relatedIds: ['comp-1', 'serv-1']
  },
  {
    id: 'comp-1',
    name: 'Procesador AMD Ryzen 5 5600GT',
    description: '3.6GHz Base / 4.6GHz Max, con gráficos integrados.',
    fullDescription: 'Procesador veloz con potentes tarjetas gráficas integradas Radeon para un rendimiento de juego fluido en 1080p desde el primer momento. 6 núcleos, 12 hilos. Desbloqueado para hacer overclocking.',
    price: 600.00,
    category: 'componentes',
    imageUrl: '/ryzen-5600gt.jpg',
    specs: ['Socket AM4', '6 Núcleos / 12 Hilos', 'Hasta 4.6 GHz', 'Gráficos Radeon'],
    condition: 'Nuevo',
    enStock: true,
    relatedIds: ['comp-4']
  },
  {
    id: 'comp-2',
    name: 'Procesador Intel Core i5 12400',
    description: '2.50GHz Base / 4.40GHz Max, 18MB Caché, LGA 1700.',
    fullDescription: 'Experimenta el rendimiento superior con el procesador Intel de 12ª generación, optimizado para la multitarea, creación de contenido y juegos de nivel medio-alto sin cuellos de botella.',
    price: 850.00,
    category: 'componentes',
    imageUrl: '/intel-i5.jpg',
    specs: ['Socket LGA 1700', '6 Núcleos / 12 Hilos', '18 MB Intel Smart Cache', 'PCIe 5.0 soportado'],
    condition: 'Nuevo',
    enStock: true,
    relatedIds: ['comp-4']
  },
  {
    id: 'comp-3',
    name: 'Combo Teclado y Mouse Logitech MK120',
    description: 'Combo de teclado y mouse duradero con conexión USB.',
    fullDescription: 'Un combo excelente a un gran precio. Diseño de tamaño estándar duradero, resistente a salpicaduras. Las teclas fáciles de leer permiten una escritura silenciosa. El mouse óptico ofrece precisión.',
    price: 60.00,
    category: 'componentes',
    imageUrl: '/logitech-mk120.jpg',
    specs: ['Conexión por cable USB', 'Resistente a salpicaduras', 'Teclado numérico completo', 'Diseño ambidiestro'],
    condition: 'Nuevo',
    enStock: true
  },
  {
    id: 'comp-4',
    name: 'Placa Madre Gigabyte H610M',
    description: 'Socket LGA 1700, ideal para procesadores Intel de 12va generación.',
    fullDescription: 'Placa base micro ATX confiable. Cuenta con LAN Gigabit exclusiva para juegos, condensadores de audio de alta calidad y funciones de refrigeración integradas. Compatible con las nuevas memorias DDR4.',
    price: 325.00,
    category: 'componentes',
    imageUrl: '/gigabyte-h610m.jpg',
    specs: ['Socket LGA 1700', 'Soporta Intel 12th/13th Gen', 'Micro ATX', 'DDR4 y PCIe 4.0'],
    condition: 'Nuevo',
    enStock: true,
    relatedIds: ['comp-2']
  },
  {
    id: 'serv-1',
    name: 'Mantenimiento Preventivo (Laptop/PC)',
    description: 'Limpieza interna, cambio de pasta térmica y optimización de sistema.',
    fullDescription: 'Tu equipo sufre desgaste con el polvo, sobrecalentándose e interrumpiendo tu jornada porque se pone muy lento. Con nuestro servicio especializado de prevención, abrimos con cuidado tu equipo, removemos las pelusas de los ventiladores, le aplicamos silicona a los conductos y pasta refrigerante de marcas top a tu chip para extender la vida y fluidez.',
    price: 0,
    category: 'servicios',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800',
    relatedIds: ['serv-2', 'serv-3']
  },
  {
    id: 'serv-2',
    name: 'Instalación de Sistema Operativo',
    description: 'Instalación limpia de Windows 10/11 o Linux con drivers y programas básicos.',
    fullDescription: 'Olvídate de los virus, problemas de inicio, las odiosas pantallas azules y configuraciones raras. Realizamos un formateo profundo o instalación limpia que dejará la pc corriendo como si saliera recién de fábrica. Incorporamos de regalo los drivers correctos y herramientas infaltables para navegar o trabajar (Office, Navegadores y Compresores).',
    price: 0,
    category: 'servicios',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800',
    relatedIds: ['serv-1']
  },
  {
    id: 'serv-3',
    name: 'Diagnóstico de Hardware',
    description: 'Revisión completa para detectar fallas en componentes (Se descuenta si se realiza la reparación).',
    fullDescription: 'Si tu computadora no prende, muestra rayas en la pantalla o se apaga sola, con este servicio localizaremos cuál es exactamente el origen del fallo. Nuestros técnicos usan medidores, osciladores y diagnósticos por software con lo que podrán confirmarte un reporte certero. ¡Si aceptas la reparación post-diagnóstico, este te saldrá completamente gratis!',
    price: 0,
    category: 'servicios',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
    relatedIds: ['comp-1', 'comp-2', 'serv-1']
  }
];
