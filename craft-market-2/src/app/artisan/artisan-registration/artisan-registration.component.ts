import { Component } from '@angular/core';
import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';

@Component({
  selector: 'app-artisan-registration',
  templateUrl: './artisan-registration.component.html',
  styleUrls: ['./artisan-registration.component.css']
})
export class ArtisanRegistrationComponent {
  artisan: Artisan = {
    // Initialize with empty values or default values if needed
    artisan_name: '',
    location: '',
    userId: 0 // Assuming userId is a number and initializing it to 0
  };

  constructor(private artisanService: ArtisanService) {}

  registerArtisan(): void {
    this.artisanService.createArtisan(this.artisan).subscribe(
      (response) => {
        console.log('Artisan registered successfully:', response);
      },
      (error) => {
        console.error('Error registering artisan:', error);
        // Handle error: display error message to the user or retry registration
      }
    );
  }
}
