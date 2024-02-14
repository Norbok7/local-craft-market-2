import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users: User[] | undefined;
  newUser: User = { username: '', password: '', email: '', user_type: '' };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(newUser => {
      console.log('User created:', newUser);
      this.getUsers();
      this.newUser = { username: '', password: '', email: '', user_type: '' }; // Reset new user object
    });
  }

  updateUser(): void {
    const userToUpdate = this.users ? this.users[0] : null; // Get the first user (if available)
    if (userToUpdate) {
      userToUpdate.username = 'updatedUsername'; // Example: update username
      this.userService.updateUser(userToUpdate).subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        this.getUsers();
      });
    }
  }

  deleteUser(): void {
    const userIdToDelete = this.users ? this.users[0]?.id : null; // Get the ID of the first user (if available)
    if (userIdToDelete) {
      this.userService.deleteUser(userIdToDelete).subscribe(() => {
        console.log('User deleted successfully');
        this.getUsers();
      });
    }
  }
}
