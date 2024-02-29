export interface Product {
  id: number; // Make the id property non-optional
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  artisanId: number;
  image_url: string;
}
