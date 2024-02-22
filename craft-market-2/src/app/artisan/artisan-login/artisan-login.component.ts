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
  artisanName: string = '';
  location: string = '';
  bio: string = ''; // Add bio property

  constructor(private authService: AuthService) {}

  loginArtisan(): void {
    this.authService.login({ username: this.username, password: this.password });
  }

  signupArtisan(): void {
    const artisan = {
      artisan_name: this.artisanName,
      location: this.location,
      bio: this.bio // Include bio in the artisan object
      // Add other artisan fields as needed
    };
    this.authService.signup(artisan).subscribe(
      response => {
        // Handle successful signup
      },
      error => {
        // Handle signup error
      }
    );
  }
}
