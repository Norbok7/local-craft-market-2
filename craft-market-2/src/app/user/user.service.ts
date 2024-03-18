import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { Artisan } from '../artisan/artisan.model';
import { Order } from '../order/order.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/users/${userId}/orders`).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User> {
    if (user.user_type === "Artisan") {
      // Create an Artisan object from the User object
      const artisan: Artisan = {
        artisan_name: user.username,
      };
      return this.createArtisan(artisan);
    } else {
      // For other user types, create a regular User record
      return this.createUserRecord(user);
    }
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  changeUserPassword(userId: number, newPassword: string): Observable<void> {
    const payload = { password: newPassword };
    return this.http.put<void>(`${this.apiUrl}/users/${userId}/change-password`, payload).pipe(
      catchError(this.handleError)
    );
  }



  getUserDetails(userId: number): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API error:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  private createArtisan(artisan: Artisan): Observable<User> {
    return this.http.post<Artisan>(`${this.apiUrl}/artisans`, artisan).pipe(
      map((createdArtisan: Artisan) => {
        const userObject: User = {
          id: createdArtisan.id,
          username: artisan.artisan_name,
          password: '', // You might not want to set the password here
          email: '', // You might not want to set the email here
          user_type: 'Artisan'
        };
        return userObject;
      }),
      catchError(this.handleError)
    );
  }

  private createUserRecord(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }
}

