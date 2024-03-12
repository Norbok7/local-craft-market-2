// order.model.ts

import { OrderItem } from './order-item.model';

export interface Order {
  id?: number;
  order_date: string;
  total_amount: number;
  userId: number;
  items?: OrderItem[]; // Use OrderItem type here
}
