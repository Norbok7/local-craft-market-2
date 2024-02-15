export interface Review {
  id?: number; // Optional property for the review ID
  rating: number; // Rating given in the review (e.g., out of 5)
  comment: string; // Text comment provided in the review
  date?: string; // Optional property for the date of the review
  productId: number; // ID of the product being reviewed
  userId: number; // ID of the user who submitted the review
}
