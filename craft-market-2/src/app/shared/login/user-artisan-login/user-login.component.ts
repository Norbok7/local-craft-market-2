import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user.model';
import { Router } from '@angular/router';
import { ArtisanService } from '../../../artisan/artisan.service';
import { Artisan } from '../../../artisan/artisan.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  userType: string = 'Artisan'; // Default user type
  user: User = { username: '', password: '', bio: '', email: '', user_type: '' };
  isRegistering: boolean = false;


  artisan: any = {
    bio: ''
  };


  constructor(private artisanService: ArtisanService, private authService: AuthService, private userService: UserService, private router: Router) {}

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
  }

  login(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        if (response && response.user_id) {
          const userId = response.user_id;
          // Fetch user details including user type from backend
          this.userService.getUserDetails(userId).subscribe(
            (user) => {
              // Check if the user type matches the selected type
              if (user) {
                localStorage.setItem('userId', userId);
                if (user.user_type === 'Artisan') {
                  this.router.navigate(['/artisan', userId]); // Navigate to artisan profile
                } else {
                  this.router.navigate(['/users', userId]); // Navigate to user profile
                }
              } else {
                console.error('User details not found');
              }
            },
            (error) => {
              console.error('Error fetching user details:', error);
            }
          );
        } else {
          console.error('Invalid response after login:', response);
        }
      },
      (error) => {
        console.error('Error logging in:', error);
      }
    );
  }


  registerUser(): void {
    // Implement your user registration logic here using UserService
    // Example:
    this.user.user_type = 'Buyer';

    this.userService.createUser(this.user).subscribe(
      (user) => {
        console.log('User registered:', user);
        // Redirect to appropriate page after registration
        // Example:
        this.router.navigate(['/user-profile']);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  registerArtisan(): void {
    // Check if the user is authenticated
    if (!this.isUserAuthenticated()) {
      // If not authenticated, set the user type to "Buyer"
      this.user.user_type = 'Buyer';
    }

    // Proceed with registration logic based on the user type
    if (this.user.user_type === 'Artisan') {
      // Create the artisan object with artisan_name and bio fields only
      const artisan: Artisan = {
        artisan_name: this.user.username,
        bio: this.artisan.bio // Include the bio field
      };

      // Call the createArtisan method from the artisanService
      this.artisanService.createArtisan(artisan).subscribe(
        (createdArtisan) => {
          console.log('Artisan registered:', createdArtisan);
          // Redirect to appropriate page after registration
          this.router.navigate(['/artisan-profile']);
        },
        (error) => {
          console.error('Error registering artisan:', error);
        }
      );
    } else {
      console.error('User is not an Artisan');
    }
  }

  isUserAuthenticated(): boolean {
    // Implement your authentication logic here
    // For example, you can check if the user is logged in
    // You can use the AuthService to check the authentication status
    return this.authService.isUserAuthenticated();
  }
}
