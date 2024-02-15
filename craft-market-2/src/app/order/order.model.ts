export interface Order {
  id?: number; // Optional property for the order ID
  order_date: string; // Date of the order
  total_amount: number; // Total amount of the order
  userId: number; // ID of the user who placed the order
}
