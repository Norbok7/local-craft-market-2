import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Artisan } from './artisan.model';
import { environment } from '../../environments/environment';
import { User } from '../user/user.model';
@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private apiUrl = environment.apiUrl; // Use apiUrl from environment

  constructor(private http: HttpClient) { }

  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(`${this.apiUrl}/artisans`);
  }

  getArtisan(id: number): Observable<Artisan> {
    return this.http.get<Artisan>(`${this.apiUrl}/artisans/${id}`);
  }

  createUser(user: User): Observable<User | Artisan> {
    if (user.user_type === "Artisan") {
      const artisan: Artisan = {
        artisan_name: user.username,
        password: user.password, // Include the password property
        bio: user.bio || '' // Use user.bio if it exists, otherwise use an empty string
      };
      return this.createArtisan(artisan); // Create artisan if user type is Artisan
    } else {
      // Create regular user record for other user types
      return this.createUserRecord(user);
    }
  }


  createArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http.post<Artisan>(`${this.apiUrl}/artisans`, artisan).pipe(
      catchError(this.handleError)
    );
  }

  createUserRecord(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API error:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
