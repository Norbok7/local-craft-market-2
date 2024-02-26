import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    // Update cart items after removal
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    // Update cart items after clearing
    this.cartItems = [];
  }
}
