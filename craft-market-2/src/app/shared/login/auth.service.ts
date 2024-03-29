import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../user/user.model'; // Import the User model

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    // Check for token on initialization
    const token = this.getToken();
    if (token) {
      this.loggedIn.next(true);
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Clear user session information if localStorage is defined
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    // Set logged out status
    this.loggedIn.next(false);
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isUserAuthenticated(): boolean {
    // Check if user is authenticated based on token presence
    return !!this.getToken();
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getCurrentUser(): Observable<User | null> {
    const token = this.getToken();
    if (token) {
      return this.http.get<User>(`${this.apiUrl}/users/current`).pipe(
        tap(user => {
          this.currentUser.next(user); // Update currentUser subject
        }),
        catchError(error => {
          console.error('Error fetching current user:', error);
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API error:', error);
    if (error.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      this.router.navigate(['/login']);
    }
    return throwError('Something went wrong. Please try again later.');
  }
}
