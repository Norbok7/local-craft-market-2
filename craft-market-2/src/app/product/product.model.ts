export interface Product {
  id?: number; // Optional property for the product ID
  title: string; // Title of the product
  description: string; // Description of the product
  category: string; // Category of the product
  price: number; // Price of the product
  quantity: number; // Quantity available for the product
  artisanId: number; // ID of the artisan who created the product
}
