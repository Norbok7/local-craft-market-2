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



}
