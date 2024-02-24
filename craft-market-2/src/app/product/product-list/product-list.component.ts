import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedSortOption: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilter(); // Apply filter initially
    });
  }

  applyFilter(): void {
    switch (this.selectedSortOption) {
      case 'priceLowToHigh':
        this.filteredProducts = this.products.slice().sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        this.filteredProducts = this.products.slice().sort((a, b) => b.price - a.price);
        break;
      case 'quantityLowToHigh':
        this.filteredProducts = this.products.slice().sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantityHighToLow':
        this.filteredProducts = this.products.slice().sort((a, b) => b.quantity - a.quantity);
        break;
      case 'titleAZ':
        this.filteredProducts = this.products.slice().sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleZA':
        this.filteredProducts = this.products.slice().sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Add more cases for other filter options
      default:
        this.filteredProducts = this.products; // Default to unsorted products
        break;
    }
  }

  navigateToProductDetails(productId: number | undefined): void {
    if (productId !== undefined) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Product ID is undefined');
      // Handle the case where product ID is undefined
    }
  }
}
