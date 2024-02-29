import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent {
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the review form with form controls
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required], // Rating is required
      comment: ['', Validators.required] // Comment is required
    });
  }

  // Method to submit the review form
  submitReview(): void {
    if (this.reviewForm.valid) {
      // Get the form values
      const rating = this.reviewForm.get('rating')?.value;
      const comment = this.reviewForm.get('comment')?.value;

      // Here you can send the review data to your backend for processing
      // For example, call a service method to create the review
      console.log('Rating:', rating);
      console.log('Comment:', comment);

      // Optionally, you can reset the form after submission
      this.reviewForm.reset();
    } else {
      // Handle form validation errors or display validation messages
      // For example, mark form controls as touched to show validation messages
      this.markFormControlsAsTouched();
    }
  }

  // Method to mark form controls as touched to trigger validation messages
  markFormControlsAsTouched(): void {
    Object.values(this.reviewForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
