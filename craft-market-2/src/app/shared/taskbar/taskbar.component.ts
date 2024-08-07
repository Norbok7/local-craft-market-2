import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '../../product/cartservice.service';
import { UserService } from '../../user/user.service';
import { Product } from '../../product/product.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  cartItemCount: number = 0; // Initialize with 0
  userId: any | null;
  artisanId: any | null; // Declare artisanId property
  // URL and title for sharing
  shareUrl: string;
  shareTitle = 'Check out these amazing products!';

  constructor(
    private location: Location,
    private authService: AuthService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.shareUrl = this.location.path();
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

    // Fetch current artisan's ID if logged in
    this.isLoggedIn$.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        // Retrieve artisan ID from localStorage
        this.artisanId = localStorage.getItem('artisanId');
        if (this.artisanId) {
          console.log('Artisan ID:', this.artisanId); // Add console log here
        } else {
          console.error('Artisan ID not found in localStorage');
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

  // Method to navigate to artisan profile
  navigateToArtisanProfile(artisanId: string | null) {
    if (artisanId) {
      console.log('Navigating to artisan profile with ID:', artisanId);
      this.router.navigate(['/artisan', artisanId]);
    } else {
      console.error('Artisan ID is null or undefined');
    }
  }

}
