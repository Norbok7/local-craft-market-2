export interface Product {
  id?: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  artisan_id: number; // Updated attribute name to match Rails convention
  image_url: string;
}

