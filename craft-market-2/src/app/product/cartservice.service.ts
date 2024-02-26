import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]); // BehaviorSubject to store cart items

  constructor() { }

  addToCart(product: Product): void {
    this.cartItemsSubject.next([...this.cartItemsSubject.value, product]); // Add the product to the cartItems array and emit the updated array
  }

  removeFromCart(product: Product): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item !== product); // Remove the product from the cartItems array
    this.cartItemsSubject.next(updatedItems); // Emit the updated array
  }

  get cartItems$(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable(); // Expose cart items as an Observable
  }

  getCartItems(): Product[] {
    return this.cartItemsSubject.value; // Return the current array of cart items
  }

  clearCart(): void {
    this.cartItemsSubject.next([]); // Clear the cart by emitting an empty array
  }
}
