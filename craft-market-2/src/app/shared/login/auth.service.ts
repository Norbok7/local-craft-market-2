import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
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
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          // Redirect to user profile with ID after successful login
          this.router.navigate(['/users', response.user_id]); // Assuming your response includes the user's ID
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
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
}

