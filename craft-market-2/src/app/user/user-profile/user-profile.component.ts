import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users: User[] | undefined;
  newUser: User = { username: '', password: '', email: '', user_type: '' };
  updatedUser: User = { username: '', password: '', email: '', user_type: '' };
  selectedUser: User | undefined;

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

  selectUser(): void {
    // No need to do anything here, since selectedUser is already bound via ngModel
  }

  updateUser(): void {
    if (this.selectedUser && this.selectedUser.id) { // Check if selectedUser and its id are defined
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        this.getUsers();
        this.selectedUser = { username: '', password: '', email: '', user_type: '' }; // Reset updated user object
      });
    }
  }

  deleteUser(): void {
    if (this.selectedUser && this.selectedUser.id) { // Check if selectedUser and its id are defined
      this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
        console.log('User deleted successfully');
        this.getUsers();
      });
    }
  }

}
