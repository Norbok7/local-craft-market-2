import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId!: number; // Define userId as a non-nullable number
  user: User | undefined;

  // Properties for form fields
  updatedUsername: string = '';
  updatedEmail: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage: string = ''; // Property to hold error messages

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Get the user ID from the URL parameter
      if (!isNaN(id)) { // Check if id is a valid number
        this.userId = id;
        this.userService.getUserById(this.userId).subscribe(user => {
          this.user = user;
        }, error => {
          this.errorMessage = 'Failed to fetch user data. Please try again later.';
          console.error('Failed to fetch user data:', error);
        });
      } else {
        // Handle the case where the ID is not a valid number
        console.error('Invalid user ID');
      }
    });
  }

  updateProfile(): void {
    // Make API call to update user profile information
    this.userService.updateUserProfile(this.userId, {
      username: this.updatedUsername,
      email: this.updatedEmail
    }).subscribe(response => {
      // Handle success or display error message
    }, error => {
      this.errorMessage = 'Failed to update profile. Please try again later.';
      console.error('Failed to update profile:', error);
    });
  }

  changePassword(): void {
    // Check if new password and confirm password match
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'New password and confirm password must match.';
      return;
    }

    // Make API call to change user password
    this.userService.changeUserPassword(this.userId, this.newPassword).subscribe(response => {
      // Handle success or display error message
    }, error => {
      this.errorMessage = 'Failed to change password. Please try again later.';
      console.error('Failed to change password:', error);
    });
  }
}
