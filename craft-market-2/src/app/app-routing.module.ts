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
import { HomeComponent } from './shared/home/home.component'; // Import HomeComponent
import { AuthGuard } from './shared/login/auth.guard';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { ArtisanLoginComponent } from './artisan/artisan-login/artisan-login.component';
import { LoginComponent } from './shared/login/login.component';
import { CartComponent } from './product/cart/cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-orders', component: UserOrdersComponent, canActivate: [AuthGuard] },
  { path: 'user-reviews', component: UserReviewsComponent, canActivate: [AuthGuard] },
  { path: 'artisan-profile', component: ArtisanProfileComponent},
  { path: 'artisan-products', component: ArtisanProductsComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewListComponent, canActivate: [AuthGuard] },
  { path: 'reviews/:id', component: ReviewDetailsComponent, canActivate: [AuthGuard] },
  { path: 'artisans/:id/products', component: ArtisanProductsComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login/user', component: UserLoginComponent },
  { path: 'login/artisan', component: ArtisanLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent }, // Add this route for the CartComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' } // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
