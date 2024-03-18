import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Order } from '../../order/order.model';
import { OrderService } from '../../order/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // Retrieve user ID from route parameters
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.orderService.getOrdersByUserId(parseInt(userId, 10)).subscribe(
        (orders: Order[]) => {
          this.orders = orders;

          // Log the orders array after it's filled
          console.log('Orders:', this.orders);
        },
        (error) => {
          console.error('Error fetching orders:', error);
          // Handle error, maybe set a flag for displaying an error message in the template
        }
      );
    } else {
      console.error('User ID is missing from route parameters');
      // Handle missing user ID
    }
  }

}
