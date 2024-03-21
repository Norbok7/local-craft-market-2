import { Product } from "../product/product.model";

export interface Artisan {
  id?: number; // Optional property for the artisan ID
  username: string; // Name of the artisan
  password: string; // Password of the artisan
  bio?: string; // Optional bio of the artisan
  user_type: string; // User type (e.g., "Artisan")
  products?: Product[]; // Array of products associated with the artisan
}
