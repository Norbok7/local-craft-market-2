import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { ArtisanProfileComponent } from './artisan/artisan-profile/artisan-profile.component';
import { ArtisanProductsComponent } from './artisan/artisan-products/artisan-products.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrderListComponent } from './order/order-history/order-list.component';
import { ReviewDetailsComponent } from './review/review-details/review-details.component';
import { AuthGuard } from './shared/login/auth.guard';
import { UserLoginComponent } from './shared/login/user-login/user-login.component';
import { CartComponent } from './product/cart/cart.component';
import { ArtisanLoginComponent } from './shared/login/artisan-login/artisan-login.component';
import { HelpInfoComponent } from './shared/help-info/help-info.component';
const routes: Routes = [
  { path: 'help', component: HelpInfoComponent },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/orders', component: UserOrdersComponent, canActivate: [AuthGuard] },
  { path: 'artisan-profile', component: ArtisanProfileComponent, canActivate: [AuthGuard] },
  { path: 'artisan-products', component: ArtisanProductsComponent, canActivate: [AuthGuard] },
  { path: 'artisan/:id', component: ArtisanProfileComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id/:totalAmount', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'reviews/:id', component: ReviewDetailsComponent, canActivate: [AuthGuard] },
  { path: 'artisans/:id/products', component: ArtisanProductsComponent, canActivate: [AuthGuard] },
  { path: 'login/user', component: UserLoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'artisan-login', component: ArtisanLoginComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products page
  { path: '**', redirectTo: '/products' } // Handle invalid routes by redirecting to products page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
