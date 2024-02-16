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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artisanId = +params['id']; // Get the artisan ID from the route parameters
      this.getArtisanProducts();
    });
  }

  getArtisanProducts(): void {
    if (this.artisanId) {
      this.productService.getProductsByCategory(this.artisanId.toString()).subscribe(products => {
        this.products = products;
      });
    }
  }
}
