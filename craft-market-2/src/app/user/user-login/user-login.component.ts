// user-login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  loginUser(): void {
    this.authService.login({ username: this.username, password: this.password });
  }
}
