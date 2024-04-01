import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../../shared/login/auth.service';
import { User } from '../user.model';
import { Order } from '../../order/order.model';

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
  showChangePasswordForm: boolean = false; // New property to toggle password change form

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
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

  toggleChangePasswordForm(): void { // Function to toggle the password change form
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'New password and confirm password must match.';
      return;
    }

    this.userService.changeUserPassword(this.userId, this.newPassword).subscribe(
      response => {
        // Handle success or display success message
        console.log('Password changed successfully:', response);
        // Reset form fields and hide the form
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.showChangePasswordForm = false;
      },
      error => {
        this.errorMessage = 'Failed to change password. Please try again later.';
        console.error('Failed to change password:', error);
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
