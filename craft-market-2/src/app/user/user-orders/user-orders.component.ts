import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';
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
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (currentUser) => {
        if (currentUser && currentUser.id) {
          this.orderService.getOrdersByUserId(currentUser.id).subscribe(
            (orders: Order[]) => {
              this.orders = orders;
            },
            (error) => {
              console.error('Error fetching orders:', error);
              // Handle error, maybe set a flag for displaying an error message in the template
            }
          );
        } else {
          console.error('User ID is missing');
          // Handle missing user ID
        }
      },
      (error) => {
        console.error('Error fetching current user:', error);
        // Handle error, maybe set a flag for displaying an error message in the template
      }
    );
  }

}
