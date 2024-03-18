import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  userType: string = 'Artisan'; // Default user type
  user: User = { username: '', password: '', email: '', user_type: '' };
  isRegistering: boolean = false;
  

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  loginUser(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        if (response && response.user_id) {
          const userId = response.user_id;
          // Fetch user details including user type from backend
          this.userService.getUserDetails(userId).subscribe(
            (user) => {
              // Check if the user type matches the selected type
              if (user) {
                localStorage.setItem('userId', userId);
                if (user.user_type === 'Artisan') {
                  this.router.navigate(['/artisan', userId]); // Navigate to artisan profile
                } else {
                  this.router.navigate(['/users', userId]); // Navigate to user profile
                }
              } else {
                console.error('User details not found');
              }
            },
            (error) => {
              console.error('Error fetching user details:', error);
            }
          );
        } else {
          console.error('Invalid response after login:', response);
        }
      },
      (error) => {
        console.error('Error logging in:', error);
      }
    );
  }


  registerUser(): void {
    this.userService.createUser(this.user).subscribe(
      (user) => {
        console.log('User registered:', user);
        this.isRegistering = false;
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }
}
