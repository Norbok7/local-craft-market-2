import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user: User = {
    // Initialize with empty values or default values if needed
    username: '',
    email: '',
    password: '',
    user_type: 'regular' // Set a default user type if needed
  };

  constructor(private userService: UserService) {}

  registerUser(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Optionally, redirect to a success page or perform other actions
      },
      (error) => {
        console.error('Error registering user:', error);
        // Handle error: display error message to the user or retry registration
      }
    );
  }
}
