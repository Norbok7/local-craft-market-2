// order.model.ts

import { OrderItem } from './order-item.model';

export interface Order {
  id?: number;
  order_date: string;
  total_amount: number;
  user_id: number; // Adjusted property name
  items?: OrderItem[]; // Use OrderItem type here
}
