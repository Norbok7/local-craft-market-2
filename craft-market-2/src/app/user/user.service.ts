import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; // Use apiUrl from environment

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  updateUserProfile(userId: number, updatedUser: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, updatedUser);
  }

  changeUserPassword(userId: number, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${userId}/change-password`, { newPassword });
  }
  getCurrentUser(): Observable<User | null> {
    // Assuming your backend provides an endpoint to fetch the current user
    return this.http.get<User>(`${this.apiUrl}/users/current`);
  }
}

