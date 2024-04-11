import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';
import { AuthService } from '../../shared/login/auth.service';

@Component({
  selector: 'app-artisan-profile',
  templateUrl: './artisan-profile.component.html',
  styleUrls: ['./artisan-profile.component.css']
})
export class ArtisanProfileComponent implements OnInit {
  artisan: Artisan | undefined;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private artisanService: ArtisanService) { }

  ngOnInit(): void {
    this.getArtisan();
  }

  getArtisan(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.artisanService.getArtisan(id).subscribe(artisan => {
      this.artisan = artisan;
    });
  }

  navigateToProducts(): void {
    if (this.artisan && this.artisan.id) {
      // Navigate to products page with artisan ID as a parameter
      this.router.navigate(['/artisans', this.artisan.id, 'products']);
    } else {
      console.error('Artisan ID not available.');
    }
  }
  logout(): void {
    // Call the logout method from the AuthService
    this.auth.logout();
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
