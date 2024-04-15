import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './shared/login/token-interceptor.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { TaskbarComponent } from './shared/taskbar/taskbar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ArtisanProfileComponent } from './artisan/artisan-profile/artisan-profile.component';
import { ArtisanProductsComponent } from './artisan/artisan-products/artisan-products.component';
import { UserLoginComponent } from './shared/login/user-login/user-login.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartComponent } from './product/cart/cart.component';
import { ReviewDetailsComponent } from './review/review-details/review-details.component';
import { OrderListComponent } from './order/order-history/order-list.component';
import { HomeComponent } from './shared/home/home.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { ArtisanLoginComponent } from './shared/login/artisan-login/artisan-login.component';
import { HelpInfoComponent } from './shared/help-info/help-info.component';
import { HelpSellingComponent } from './shared/help-selling/help-selling.component';
import { AboutpageComponent } from './shared/aboutpage/aboutpage.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TaskbarComponent,
    ProductListComponent,
    ArtisanProfileComponent,
    ArtisanProductsComponent,
    UserLoginComponent,
    ProductDetailsComponent,
    CartComponent,
    ReviewDetailsComponent,
    OrderListComponent,
    HomeComponent,
    UserOrdersComponent,
    ArtisanLoginComponent,
    HelpInfoComponent,
    HelpSellingComponent,
    AboutpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,


  ],
  providers: [
    // Provide HTTP_INTERCEPTORS token for your interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
