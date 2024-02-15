import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category']; // Read category parameter from route
      if (category) {
        this.getProductsByCategory(category); // Call method to fetch products based on category
      } else {
        this.getProducts(); // Call method to fetch all products if no category is specified
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.products = products;
    });
  }
}
