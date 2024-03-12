import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  totalAmount: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: any[]) => {
        this.orders = orders;
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.orders.reduce((total, order) => total + parseFloat(order.total_amount), 0);
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      (response: any) => {
        console.log('Order deleted successfully:', response);
        // Remove the deleted order from the list
        this.orders = this.orders.filter(order => order.id !== orderId);
        // Recalculate the total amount
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error deleting order:', error);
        // Handle error
      }
    );
  }

  viewOrderDetailsForCheckout(): void {
    if (this.orders.length > 0) {
      const lastOrderId = this.orders[this.orders.length - 1].id; // Get the last order ID
      this.router.navigate(['/orders', lastOrderId]);
    }
  }
}
