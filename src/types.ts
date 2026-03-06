export type Category = 'laptops-nuevas' | 'laptops-usadas' | 'componentes' | 'servicios';

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  category: Category;
  imageUrl: string;
  specs?: string[];
  condition?: 'Nuevo' | 'Como Nuevo' | 'Usado' | 'Sellado' | 'Reacondicionado' | string;
  relatedIds?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
