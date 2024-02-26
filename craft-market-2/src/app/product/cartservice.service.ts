import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = []; // Array to store cart items

  constructor() { }

  addToCart(product: Product): void {
    this.cartItems.push(product); // Add the product to the cartItems array
  }

  getCartItems(): Product[] {
    return this.cartItems; // Return the array of cart items
  }

  clearCart(): void {
    this.cartItems = []; // Clear the cart by resetting the array
  }
}
