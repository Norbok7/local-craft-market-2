import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Remove provideHttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { TopTitleComponent } from './shared/top-title/top-title.component';
import { TaskbarComponent } from './shared/taskbar/taskbar.component';
import { ProductListComponent } from './product/product-list/product-list.component'; // Import ProductListComponent

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TopTitleComponent,
    TaskbarComponent,
    ProductListComponent // Include ProductListComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule, // Ensure CommonModule is imported
    FormsModule,
    SharedModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
