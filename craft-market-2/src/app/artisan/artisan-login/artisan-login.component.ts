// artisan-login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../shared/login/auth.service';

@Component({
  selector: 'app-artisan-login',
  templateUrl: './artisan-login.component.html',
  styleUrls: ['./artisan-login.component.css']
})
export class ArtisanLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  loginArtisan(): void {
    this.authService.login({ username: this.username, password: this.password });
  }
}
