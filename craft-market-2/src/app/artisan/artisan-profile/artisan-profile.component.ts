import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';

@Component({
  selector: 'app-artisan-profile',
  templateUrl: './artisan-profile.component.html',
  styleUrls: ['./artisan-profile.component.css']
})
export class ArtisanProfileComponent implements OnInit {
  artisans: Artisan[] = [];

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    this.getArtisans();
  }

  getArtisans(): void {
    this.artisanService.getArtisans().subscribe(artisans => {
      this.artisans = artisans;
    });
  }
}
