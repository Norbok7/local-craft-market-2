import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { Review } from '../../review/review.model';
import { CartService } from '../cartservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup for form handling
import { ReviewService } from '../review.service'; // Import the ReviewService

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

  // Method to submit the review form
  submitReview(): void {
    if (this.reviewForm.valid) {
      // Get the form values
      const rating = this.reviewForm.get('rating')?.value;
      const comment = this.reviewForm.get('comment')?.value;

      // Create a new review object
      const newReview: Review = {
        rating: rating,
        comment: comment,
        productId: this.productData!.id!, // Assuming productData is not null here
        userId: 1 // You can set the user ID here, replace it with the actual user ID from your authentication system
      };

      // Call the review service to create the review
      this.reviewService.createReview(newReview).subscribe(
        (createdReview) => {
          console.log('Review created successfully:', createdReview);
          // Optionally, you can refresh the product reviews here after adding the new review
          this.getProductReviews(this.productData!.id!);
          // Reset the review form after submission
          this.reviewForm.reset();
        },
        (error) => {
          console.error('Failed to create review:', error);
        }
      );
    } else {
      // Handle form validation errors or display validation messages
      // For example, mark form controls as touched to show validation messages
      this.reviewForm.markAllAsTouched();
    }
  }
}
