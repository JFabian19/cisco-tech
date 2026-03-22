export type Category = string;

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
  enStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
