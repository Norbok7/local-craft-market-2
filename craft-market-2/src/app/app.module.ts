import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopTitleComponent } from './shared/top-title/top-title.component';
import { TaskbarComponent } from './shared/taskbar/taskbar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ArtisanProfileComponent } from './artisan/artisan-profile/artisan-profile.component';
import { ArtisanProductsComponent } from './artisan/artisan-products/artisan-products.component';
import { ArtisanLoginComponent } from './shared/login/artisan-login/artisan-login.component';
import { UserLoginComponent } from './shared/login/user-login/user-login.component';
import { TokenInterceptor } from './shared/login/token-interceptor.service';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartComponent } from './product/cart/cart.component';
import { ReviewDetailsComponent } from './review/review-details/review-details.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TopTitleComponent,
    TaskbarComponent,
    ProductListComponent,
    ArtisanProfileComponent,
    ArtisanProductsComponent,
    ArtisanLoginComponent,
    UserLoginComponent,
    ProductDetailsComponent,
    CartComponent,
    ReviewDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
