import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { Review } from '../../review/review.model';
import { CartService } from '../cartservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../review/review.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: Product | null = null;
  reviews: Review[] = [];
  showReviewForm: boolean = false;
  reviewForm: FormGroup;

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
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
      this.getProductReviews(productId);
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
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      const formData = this.reviewForm.value;
      const review: Review = {
        rating: formData.rating,
        comment: formData.comment,
        product_id: this.productData?.id || 0, // Change 'productId' to 'product_id'
      };

      this.reviewService.createReview(review).subscribe(
        (response) => {
          console.log('Review submitted successfully:', response);
          this.getProductReviews(review.product_id); // Change 'productId' to 'product_id'
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );

      this.reviewForm.reset();
      this.showReviewForm = false;
    } else {
      console.error('Invalid review form');
    }
  }

}
