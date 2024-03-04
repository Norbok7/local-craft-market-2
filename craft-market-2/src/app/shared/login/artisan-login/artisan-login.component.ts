import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  loginArtisan(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      () => {
        // Redirect to artisan profile page upon successful login
        this.router.navigate(['/artisan-profile']);
      },
      (error) => {
        // Handle login error
        console.error('Error logging in:', error);
      }
    );
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
