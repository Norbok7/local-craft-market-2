import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      () => {
        // Redirect to the desired route after successful login
      },
      error => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display error message to the user)
      }
    );
  }
}
