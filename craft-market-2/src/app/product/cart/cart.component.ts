import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cartservice.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/login/auth.service';
import { OrderService } from '../../order/order.service';
import { Order } from '../../order/order.model';
import { OrderItem } from '../../order/order-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  isProcessing: boolean = false; // Flag to track whether the "Buy Now" button is being processed

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  buyNow(): void {
    // Disable the "Buy Now" button to prevent multiple clicks
    this.isProcessing = true;

    // Convert cart items to OrderItem objects
    const orderItems: OrderItem[] = this.cartItems.map(item => {
      return {
        unit_price: item.price,
        order_id: 0,
        product_id: item.id,
        quantity: 1
      };
    });

    // Create an order object
    const orderDetails: Order = {
      order_date: new Date().toISOString(),
      total_amount: this.calculateTotalAmount(this.cartItems),
      userId: 123, // Replace with actual user ID
      items: orderItems
    };

    // Create order and navigate to order list
    this.orderService.createOrder(orderDetails).subscribe(
      (response: any) => {
        console.log('Order created successfully:', response);
        this.router.navigate(['/orders']); // Navigate to order list
      },
      (error) => {
        console.error('Error creating order:', error);
        // Handle error
      }
    ).add(() => {
      // Re-enable the "Buy Now" button after the operation completes (whether successful or failed)
      this.isProcessing = false;
    });
  }

  calculateTotalAmount(cartItems: Product[]): number {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  navigateToProductDetails(productId: number): void {
    if (productId) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }
}
