import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-artisan-products',
  templateUrl: './artisan-products.component.html',
  styleUrls: ['./artisan-products.component.css']
})
export class ArtisanProductsComponent implements OnInit {
  artisanId: number | undefined;
  products: Product[] = [];
  newProduct: Product = {
    title: '',
    description: '',
    category: '',
    price: 0,
    quantity: 0,
    artisan_id: 0, // Initialize with default value
    image_url: '' // Provide a default image URL if needed
  };
  showCreateProductForm: boolean = false; // Flag to toggle create product form

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artisanId = +params['id']; // Get the artisan ID from the route parameters
      this.getArtisanProducts();
    });
  }

  getArtisanProducts(): void {
    if (this.artisanId) {
      this.productService.getProductsByArtisanId(this.artisanId).subscribe(products => {
        this.products = products;
      });
    }
  }

  createProduct(): void {
    if (this.artisanId) {
      this.newProduct.artisan_id = this.artisanId; // Set the artisan ID for the new product
      this.productService.createProduct(this.artisanId, this.newProduct).subscribe(product => {
        this.products.push(product); // Add the newly created product to the list
        this.toggleCreateProductForm(); // Close the create product form
        this.resetNewProduct(); // Reset the new product form
      });
    }
  }

  resetNewProduct(): void {
    this.newProduct = {
      title: '',
      description: '',
      category: '',
      price: 0,
      quantity: 0,
      artisan_id: this.artisanId || 0, // Set the artisanId to the current artisanId or default value
      image_url: ''
    };
  }

  toggleCreateProductForm(): void {
    this.showCreateProductForm = !this.showCreateProductForm;
  }
}
