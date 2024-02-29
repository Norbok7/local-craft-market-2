import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Remove provideHttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopTitleComponent } from './shared/top-title/top-title.component';
import { TaskbarComponent } from './shared/taskbar/taskbar.component';
import { ProductListComponent } from './product/product-list/product-list.component'; // Import ProductListComponent
import { RouterModule } from '@angular/router';
import { ArtisanProfileComponent } from './artisan/artisan-profile/artisan-profile.component';
import { ArtisanProductsComponent } from './artisan/artisan-products/artisan-products.component';
import { ArtisanLoginComponent } from './artisan/artisan-login/artisan-login.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { TokenInterceptor } from './shared/login/token-interceptor.service';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartComponent } from './product/cart/cart.component';
import { ReviewDetailsComponent } from './review/review-details/review-details.component';
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TopTitleComponent,
    TaskbarComponent,
    ProductListComponent, // Include ProductListComponent here
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
    CommonModule, // Ensure CommonModule is imported
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

  ],
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true, // Set to true if you have multiple interceptors
  },
],
bootstrap: [AppComponent]
})
export class AppModule { }

