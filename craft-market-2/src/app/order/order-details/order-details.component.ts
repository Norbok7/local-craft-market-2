import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  totalAmount: number = 0;
  orderForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.totalAmount = parseFloat(params['totalAmount']);
      this.initOrderForm();
    });
  }

  initOrderForm(): void {
    this.orderForm = this.formBuilder.group({
      shippingAddress: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      totalAmount: [`$${this.totalAmount.toFixed(2)}`]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderDetails: Order = {
        order_date: new Date().toISOString(),
        total_amount: this.totalAmount,
        userId: 123 // Replace with actual user ID
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
