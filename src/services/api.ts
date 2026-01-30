import type { Product } from '../types/Product';

// Simulating an API call
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`/db.json?t=${new Date().getTime()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(p => p.id === id);
};
