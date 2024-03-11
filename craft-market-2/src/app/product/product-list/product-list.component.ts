import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { CartService } from '../cartservice.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  selectedSortOption: string = '';
  itemsPerPage = 20;
  currentPage = 1;
  searchTerm: string = '';

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) { }

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
    // Filter based on search term
    let filteredBySearch = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    switch (this.selectedSortOption) {
      case 'priceLowToHigh':
        filteredBySearch.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        filteredBySearch.sort((a, b) => b.price - a.price);
        break;
      case 'quantityLowToHigh':
        filteredBySearch.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'quantityHighToLow':
        filteredBySearch.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'titleAZ':
        filteredBySearch.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleZA':
        filteredBySearch.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Add more cases for other filter options
      default:
        // Default to unsorted products
        break;
    }

    this.filteredProducts = filteredBySearch;
    this.updatePagedProducts(); // Update paged products after filtering
  }


  updatePagedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredProducts.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePagedProducts();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.updatePagedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedProducts();
    }
  }

  navigateToProductDetails(productId: number | undefined): void {
    if (productId) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Product ID is undefined');
      // Handle the case where product ID is undefined
    }
  }

  addToCart(product: Product): void { // Method to add product to cart
    this.cartService.addToCart(product); // Call addToCart method in CartService
    // Optionally, you can provide feedback to the user that the product has been added to the cart
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }
}
