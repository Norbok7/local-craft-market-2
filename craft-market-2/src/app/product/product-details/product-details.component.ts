import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { Review } from '../../review/review.model';
import { CartService } from '../cartservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup for form handling
import { ReviewService } from '../../review/review.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: Product | null = null;
  reviews: Review[] = []; // Array to hold product reviews
  showReviewForm: boolean = false;
  reviewForm: FormGroup; // Define the reviewForm property

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService, // Inject the ReviewService
    private route: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.getProductDetails(productId);
      this.getProductReviews(productId); // Fetch reviews for the product
    });
  }

  getProductDetails(id: number): void {
    this.productService.getProduct(id).subscribe(product => {
      this.productData = product;
    });
  }

  getProductReviews(productId: number): void {
    this.productService.getProductReviews(productId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  addToCart(product: Product | null): void {
    if (product) {
      this.cartService.addToCart(product);
      alert('Product added to cart!');
    } else {
      console.error('Product is null');
    }
  }

  openReviewForm(): void {
    // Toggle the value of showReviewForm
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview(){};
}
