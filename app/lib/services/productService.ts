import axios from 'axios';

export interface Product {
  title: string;
  price: string;
  source: string;
  link: string;
  thumbnail: string;
}

export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProductsByTypeAndColor(type: string, colors: string): Promise<Product[]> {
    try {
      const formattedColors = colors.split(',')
        .map(color => color.trim())
        .filter(color => color.length > 0)
        .map(color => color.startsWith('#') ? color : `#${color}`)
        .join(',');

      console.log('Searching for clothes type:', type);
      console.log('With color combination:', formattedColors);
      
      if (!formattedColors) {
        throw new Error('No valid colors provided');
      }

      const response = await axios.get(`/api/products?type=${encodeURIComponent(type)}&colors=${encodeURIComponent(formattedColors)}&num=100&direct_link=true`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
} 