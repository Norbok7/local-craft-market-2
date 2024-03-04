import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../../user/user.model';
import { UserService } from '../../../user/user.service';
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

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  loginUser(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        // Check if the response contains the user ID
        if (response && response.user_id) {
          // Redirect to user profile page with user ID
          this.router.navigate(['/users', response.user_id]);
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
      },
      (error) => {
        // Handle user registration error
        console.error('Error registering user:', error);
      }
    );
  }
}
