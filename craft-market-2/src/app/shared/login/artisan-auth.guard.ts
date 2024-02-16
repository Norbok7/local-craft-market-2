import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtisanService } from '../../artisan/artisan.service';

@Injectable({
  providedIn: 'root'
})
export class ArtisanAuthGuard implements CanActivate {

  constructor(private artisanService: ArtisanService, private router: Router) {} // Update to ArtisanService

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.artisanService.isArtisanAuthenticated()) { // Use isArtisanAuthenticated method from ArtisanService
      return true;
    } else {
      // Redirect to the login page with the return URL
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
