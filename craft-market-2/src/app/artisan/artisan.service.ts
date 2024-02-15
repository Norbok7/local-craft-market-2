import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private apiUrl = 'http://localhost:3000'; // Update the base URL

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
}
