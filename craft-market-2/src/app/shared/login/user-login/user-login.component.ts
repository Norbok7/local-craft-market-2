import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../../user/user.service'; // Import UserService
import { User } from '../../../user/user.model'; // Import User model
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  user: User = { username: '', password: '', email: '', user_type: '' }; // Define user property
  isRegistering: boolean = false; // Flag to track if the user is registering

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  toggleForm(): void {
    this.isRegistering = !this.isRegistering; // Toggle the form between login and registration
  }

  loginUser(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        if (response && response.user_id) {
          localStorage.setItem('userId', response.user_id); // Save user ID in localStorage
          this.router.navigate(['/users', response.user_id]); // Navigate to user profile page
        } else {
          console.error('Invalid response after login:', response);
          // Handle unexpected response
        }
      },
      (error) => {
        // Handle login error
        console.error('Error logging in:', error);
      }
    );
  }

  registerUser(): void {
    this.userService.createUser(this.user).subscribe(
      (user) => {
        // Handle successful user registration
        console.log('User registered:', user);
        this.isRegistering = false; // After successful registration, switch back to login form
      },
      (error) => {
        // Handle user registration error
        console.error('Error registering user:', error);
      }
    );
  }
}
