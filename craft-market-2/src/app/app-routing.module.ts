import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { UserReviewsComponent } from './user/user-reviews/user-reviews.component';
import { ArtisanProfileComponent } from './artisan/artisan-profile/artisan-profile.component';
import { ArtisanProductsComponent } from './artisan/artisan-products/artisan-products.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { ReviewDetailsComponent } from './review/review-details/review-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-orders', component: UserOrdersComponent },
  { path: 'user-reviews', component: UserReviewsComponent },
  { path: 'artisan-profile', component: ArtisanProfileComponent },
  { path: 'artisan-products', component: ArtisanProductsComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'reviews/:id', component: ReviewDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
