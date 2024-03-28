import { Component } from '@angular/core';
import { ArtisanService } from '../../../artisan/artisan.service';
import { AuthService } from '../auth.service';
import { Artisan } from '../../../artisan/artisan.model';
import { User } from '../../../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artisan-login',
  templateUrl: './artisan-login.component.html',
  styleUrls: ['./artisan-login.component.css']
})
export class ArtisanLoginComponent {
  artisanName: string = '';
  password: string = '';
  bio: string = '';
  loginError: string = '';
  registrationError: string = '';
  isLoginFormVisible: boolean = true; // Initially show the login form
  isRegistrationFormVisible: boolean = false;
  userType: string = ''; // Add userType property
  username: string = ''; // Add username property

  constructor(private authService: AuthService, private artisanService: ArtisanService, private router: Router) {}

  toggleForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
    this.isRegistrationFormVisible = !this.isRegistrationFormVisible;
  }

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        if (response && response.user_id) {
          const artisanId = response.user_id; // Use user_id instead of id
          // Navigate to the profile page of the logged-in artisan
          this.router.navigate(['/artisan', artisanId]);
        } else {
          console.error('Invalid response from server:', response);
        }
      },
      (error) => {
        // Handle login error
        this.loginError = error; // Display login error message
      }
    );
  }




  register(): void {
    const artisan: Artisan = {
      username: this.username,
      password: this.password,
      bio: this.bio,
      user_type: 'Artisan'
    };

    this.artisanService.createArtisan(artisan).subscribe(
      (createdArtisan) => {
        console.log('Artisan registered:', createdArtisan);
        // Redirect to the profile page of the newly registered artisan
        this.router.navigate(['/artisan', createdArtisan.id]);
      },
      (error) => {
        console.error('Error registering artisan:', error);
      }
    );
  }




}
