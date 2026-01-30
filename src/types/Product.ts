export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  priceDiscount?: number;
  rating: number;
  images: string[];
  description: string;
  gender: 'Masculino' | 'Feminino' | 'Unisex';
  state: 'Novo' | 'Usado';
  colors?: string[];
}

export interface FilterOptions {
  brand?: string[];
  category?: string[];
  gender?: string[];
  state?: string[];
  sort?: string;
}
