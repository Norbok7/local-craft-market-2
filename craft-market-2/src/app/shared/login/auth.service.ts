import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    // Adjust the endpoint URL to match your backend login route
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Check if the response contains a token
        if (response && response.token) {
          // Store authentication token
          localStorage.setItem('token', response.token);
          // Set logged in status
          this.loggedIn.next(true);
        }
      })
    );
  }

  signup(artisan: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/artisans`, artisan);
  }

  logout(): void {
    // Clear user session information
    localStorage.removeItem('token');
    // Set logged out status
    this.loggedIn.next(false);
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
