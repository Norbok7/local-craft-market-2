import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artisan } from './artisan.model';
import { environment } from '../../environments/environment';
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

  createArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http.post<Artisan>(`${this.apiUrl}/artisans`, artisan);
  }

  updateArtisan(artisanId: number, artisan: Artisan): Observable<Artisan> {
    return this.http.put<Artisan>(`${this.apiUrl}/artisans/${artisanId}`, artisan);
  }

  deleteArtisan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/artisans/${id}`);
  }
  isArtisanAuthenticated(): boolean {
    // Check if artisan is authenticated based on your authentication logic
    // For example, you can check if the artisan's token is stored in local storage
    const token = localStorage.getItem('artisanToken');
    return !!token; // Return true if token exists, otherwise false
  }
}
