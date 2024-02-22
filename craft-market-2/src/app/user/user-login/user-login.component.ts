import { Component } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
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
      () => {
        // Redirect to user profile page upon successful login
        this.router.navigate(['/user-profile']);
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
