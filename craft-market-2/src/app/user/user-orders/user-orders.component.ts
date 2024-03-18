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
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.orderService.getOrdersByUserId(parseInt(userId, 10)).subscribe(
        (orders: Order[]) => {
          this.orders = orders.map(order => {
            // Extract the product ID from the order's items
            const productId = this.getOrderProductId(order);
            // Return a new order object with productId property
            return { ...order, productId };
          });

          console.log('Orders:', this.orders);
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('User ID is missing from route parameters');
    }
  }

  getOrderProductId(order: Order): number | undefined {
    // Check if 'items' property exists and is not null or undefined
    if (order && order.items && order.items.length > 0) {
      // Assuming the product ID is stored in the first item of the order's items array
      return order.items[0]?.product_id;
    }
    // Return undefined if 'items' property is not defined or empty
    return undefined;
  }
}
