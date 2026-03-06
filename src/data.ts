import { Product } from './types';

export const products: Product[] = [
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
    relatedIds: ['comp-1', 'serv-2']
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
    name: 'Samsung 980 PRO 1TB NVMe SSD',
    description: 'Almacenamiento ultrarrápido PCIe Gen 4.0.',
    fullDescription: 'Mejora enormemente el tiempo de carga de tu sistema operativo y programas esenciales con el disco sólido SSD de Samsung. Ofrece unas fantásticas tasas de lectura y escritura superiores a la competencia con su interfaz PCIe 4.0. Perfecto como actualización para laptops antiguas o modernas que buscan mayor capacidad sin sacrificar rapidez.',
    price: 350.00,
    category: 'componentes',
    imageUrl: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=800',
    specs: ['1TB Capacidad', 'PCIe 4.0 NVMe', 'Lectura secuencia 7000 MB/s', 'Controladora Elpis'],
    condition: 'Sellado',
    relatedIds: ['serv-3']
  },
  {
    id: 'comp-2',
    name: 'Corsair Vengeance LPX 16GB (2x8GB) DDR4',
    description: 'Memoria RAM de alto rendimiento para escritorio.',
    fullDescription: 'Fabricadas para los entusiastas y profesionales de computadoras de escritorio. Disipador de calor de aluminio de alta pureza que permite una mejor disipación, un PCB de ocho capas que maneja el calor y otorga margen adicional para overclocking.',
    price: 180.00,
    category: 'componentes',
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800',
    specs: ['16GB (2x8GB)', 'DDR4 3200MHz', 'CL16', 'Perfil XMP 2.0'],
    condition: 'Nuevo',
    relatedIds: ['comp-3', 'serv-3']
  },
  {
    id: 'comp-3',
    name: 'NVIDIA GeForce RTX 4060',
    description: 'Gráficos de última generación para gaming y diseño.',
    fullDescription: 'Disfruta de la mejor experiencia de juegos con Ray Tracing activado y la inteligencia artificial (DLSS 3) que duplica tus cuadros por segundo. Ya sea que streamees contenido, realices diseño 3D o edites videos, esta gráfica ofrece un consumo reducido pero una extrema agilidad de procesamiento.',
    price: 1150.00,
    category: 'componentes',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800',
    specs: ['8GB GDDR6', 'DLSS 3', 'Ray Tracing', 'NVIDIA Encoder de 8va generación'],
    condition: 'Sellado',
    relatedIds: ['comp-2', 'serv-3']
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
