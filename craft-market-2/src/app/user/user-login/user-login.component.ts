// user-login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  user: User = { username: '', password: '', email: '', user_type: '' }; // Define user property

  constructor(private authService: AuthService, private userService: UserService) {}

  loginUser(): void {
    this.authService.login({ username: this.username, password: this.password });
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
