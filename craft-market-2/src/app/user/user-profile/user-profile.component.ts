import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../../shared/login/auth.service';
import { User } from '../user.model';
import { Order } from '../../order/order.model';
import { ArtisanService } from '../../artisan/artisan.service';
import { Artisan } from '../../artisan/artisan.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId!: number;
  user: User | undefined;
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage: string = '';
  showOrderHistory: boolean = false;
  orders: Order[] = [];
  isRegistering: boolean = false;
  artisan: Artisan = { artisan_name: '', bio: '' }; // Declare and initialize the artisan property

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.userId = id;
        this.userService.getUserById(this.userId).subscribe(
          user => {
            this.user = user;
          },
          error => {
            console.error('Failed to fetch user data:', error);
          }
        );

        // Fetch user's orders
        this.userService.getUserOrders(this.userId).subscribe(
          orders => {
            this.orders = orders;
          },
          error => {
            console.error('Failed to fetch user orders:', error);
          }
        );
      } else {
        console.error('Invalid user ID');
      }
    });
  }

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'New password and confirm password must match.';
      return;
    }

    this.userService.changeUserPassword(this.userId, this.newPassword).subscribe(
      response => {
        // Handle success or display success message
      },
      error => {
        this.errorMessage = 'Failed to change password. Please try again later.';
        console.error('Failed to change password:', error);
      }
    );
  }

  registerArtisan(): void {
    if (!this.user) {
      console.error('User is not defined');
      return;
    }

    // Create the artisan object with artisan_name and bio fields
    const artisan: Artisan = {
      artisan_name: this.user.username,
      bio: this.artisan.bio
    };

    // Call the createArtisan method from the artisanService
    this.artisanService.createArtisan(artisan).subscribe(
      (createdArtisan: Artisan) => { // Specify the type here
        console.log('Artisan registered:', createdArtisan);
        // Redirect to appropriate page after registration
        this.router.navigate(['/artisan-profile']);
      },
      (error: any) => {
        console.error('Error registering artisan:', error);
      }
    );
  }

  logout(): void {
    this.auth.logout();
  }

  toggleOrderHistory(): void {
    if (this.user) {
      const userId = this.user.id;
      this.router.navigate(['/users', userId, 'orders']);
    }
  }
}
