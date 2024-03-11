import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '../../product/cartservice.service';
import { UserService } from '../../user/user.service';
import { Product } from '../../product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  cartItemCount: number = 0; // Initialize with 0
  userId: any | null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
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
        // Retrieve user ID from localStorage
        this.userId = localStorage.getItem('userId');
        if (this.userId) {
          console.log('User ID:', this.userId); // Add console log here
        } else {
          console.error('User ID not found in localStorage');
        }
      }
    });
  }

  // Method to navigate to user profile
  navigateToUserProfile(userId: string) {
    console.log('Navigating to user profile with ID:', userId); // Add console log here
    // Navigate to the user profile page using the provided user ID
    this.router.navigate(['/users', userId]);
  }
}
