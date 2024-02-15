import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms'; // Add this line
import { SharedModule } from './shared/shared.module';
import { TopTitleComponent } from './shared/top-title/top-title.component';
import { TaskbarComponent } from './shared/taskbar/taskbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TopTitleComponent,
    TaskbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    provideClientHydration(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
