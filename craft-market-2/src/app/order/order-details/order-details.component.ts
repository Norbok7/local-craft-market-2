import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service'; // Import OrderService

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderForm!: FormGroup; // Marking as definitely assigned

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initOrderForm();
  }

  initOrderForm(): void {
    this.orderForm = this.formBuilder.group({
      // Define form controls for order details (e.g., shipping address, payment method, etc.)
      // Example:
      shippingAddress: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderDetails = this.orderForm.value;
      // Call the order service to send order details to the backend
      this.orderService.createOrder(orderDetails).subscribe(
        (response) => {
          // Handle successful order creation
          this.router.navigate(['/order-confirmation']);
        },
        (error) => {
          // Handle error
          console.error('Error creating order:', error);
          // Display error message to the user
        }
      );
    }
  }
}
