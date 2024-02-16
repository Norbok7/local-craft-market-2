import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Remove provideHttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { TopTitleComponent } from './shared/top-title/top-title.component';
import { TaskbarComponent } from './shared/taskbar/taskbar.component';
import { ProductListComponent } from './product/product-list/product-list.component'; // Import ProductListComponent
import { RouterModule } from '@angular/router';
import { ArtisanProfileComponent } from './artisan/artisan-profile/artisan-profile.component';
import { ArtisanProductsComponent } from './artisan/artisan-products/artisan-products.component';
import { ArtisanRegistrationComponent } from './artisan/artisan-registration/artisan-registration.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { ArtisanLoginComponent } from './artisan/artisan-login/artisan-login.component';
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TopTitleComponent,
    TaskbarComponent,
    ProductListComponent, // Include ProductListComponent here
    ArtisanProfileComponent,
    ArtisanProductsComponent,
    ArtisanRegistrationComponent,
    UserRegistrationComponent,
    ArtisanLoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule, // Ensure CommonModule is imported
    FormsModule,
    RouterModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
