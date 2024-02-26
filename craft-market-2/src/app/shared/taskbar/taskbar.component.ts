import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '../../product/cartservice.service';
import { UserService } from '../../user/user.service';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  cartItemCount: number = 0; // Initialize with 0
  userId: any | string;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    // Subscribe to changes in the cart items
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItemCount = items.length; // Update the cartItemCount
    });

    // Fetch current user's ID if logged in
    this.isLoggedIn$.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.userService.getCurrentUser().subscribe(
          (user) => {
            if (user) {
              this.userId = user.id;
            } else {
              console.error('Current user not found');
            }
          },
          (error) => {
            console.error('Error fetching current user:', error);
          }
        );
      }
    });
  }
}
