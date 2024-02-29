import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cartservice.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, private router: Router) { }

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

  navigateToProductDetails(productId: number): void {
    if (productId) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Product ID is undefined');
      // Handle the case where product ID is undefined
    }
  }
}
