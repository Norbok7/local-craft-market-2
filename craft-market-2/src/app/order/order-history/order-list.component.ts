import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  totalAmount: number = 0;
  orderForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
    this.initOrderForm();
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      (response: any) => {
        console.log('Order deleted successfully:', response);
        this.fetchOrders(); // Refresh orders after deletion
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.orders.reduce((total, order) => {
      console.log("Total amount of order:", order.total_amount);
      return total + parseFloat(order.total_amount.toString());
    }, 0);
  }


  initOrderForm(): void {
    this.orderForm = this.formBuilder.group({
      shippingAddress: ['', Validators.required],
      paymentMethod: ['', Validators.required]
      // Add more form fields as needed
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderDetails: any = {
        order: {
          order_date: new Date().toISOString(),
          total_amount: this.totalAmount,
          user_id: localStorage.getItem('userId'), // Retrieve the user ID from localStorage
          // Include other form fields
        }
      };

      this.orderService.createOrder(orderDetails).subscribe(
        (response: any) => {
          console.log('Order created successfully:', response);
          this.router.navigate(['/order-confirmation']);
        },
        (error) => {
          console.error('Error creating order:', error);
          // Handle error
        }
      );
    }
  }

}
