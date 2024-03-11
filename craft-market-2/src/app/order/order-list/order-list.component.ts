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

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/orders', orderId], { queryParams: { totalAmount: this.totalAmount } });
  }

}
