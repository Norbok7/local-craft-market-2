import { Product } from "../product/product.model";

export interface Artisan {
  id?: number; // Optional property for the artisan ID
  artisan_name: string; // Name of the artisan
  password: string; // Password of the artisan
  bio?: string; // Optional bio of the artisan
  products?: Product[]; // Array of products associated with the artisan
}
