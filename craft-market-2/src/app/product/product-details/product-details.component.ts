import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { CartService } from '../cartservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: Product | null = null; // Initialize with null or default values

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Extract the product ID from the route parameters
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Convert string to number
      // Fetch the details of the selected product
      this.getProductDetails(productId);
    });
  }

  getProductDetails(id: number): void {
    this.productService.getProduct(id).subscribe(product => {
      this.productData = product; // Assign retrieved data to new property
      console.log('Product Details:', product); // Log the product data to the console
    });
  }


  addToCart(product: Product | null): void {
    if (product) {
      // Call the cart service to add the product to the cart
      this.cartService.addToCart(product);
      // Optionally, provide feedback to the user that the product was added to the cart
      alert('Product added to cart!');
    } else {
      console.error('Product is null');
      // Handle the case where product is null
    }
  }
}
