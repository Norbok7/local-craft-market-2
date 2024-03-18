import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    // Modify the endpoint to include product information
    return this.http.get<Order[]>(`${this.apiUrl}/orders?include=order_items.product`);
  }

  getOrder(id: number): Observable<Order> {
    // Modify the endpoint to include product information
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}?include=order_items.product`);
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders`, order);
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/orders/${orderId}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${id}`);
  }
  getOrdersByUserId(userId: number): Observable<Order[]> {
    // Modify the endpoint to fetch orders for a specific user by their ID
    return this.http.get<Order[]>(`${this.apiUrl}/users/${userId}/orders`);
  }

}
