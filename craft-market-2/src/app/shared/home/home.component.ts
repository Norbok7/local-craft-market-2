import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
  }
  isHomePage(): boolean {
    return this.router.url === '/home'; // Adjust the URL if necessary
  }
  exploreProducts(): void {
    this.router.navigate(['/products']);
  }
  searchProducts(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/products'], { queryParams: { search: this.searchTerm.trim() } });
    }
  }
 // Placeholder function for the login option
 login(): void {
  // Implement the logic to navigate to the login page
  console.log('Navigate to login page');
}

// Placeholder function for the create user option
createUser(): void {
  // Implement the logic to navigate to the create user page
  console.log('Navigate to create user page');
}

// Placeholder function for the create artisan option
createArtisan(): void {
  // Implement the logic to navigate to the create artisan page
  console.log('Navigate to create artisan page');
}


}
