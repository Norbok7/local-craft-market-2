import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { OrderService } from '../order.service'; // Import OrderService

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    // Fetch user's orders from the backend
    this.orderService.getOrders().subscribe(
      (orders: any[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  viewOrderDetails(orderId: number): void {
    // Navigate to the Order Details page with the specified order ID
    this.router.navigate(['/orders', orderId]);
  }
}
