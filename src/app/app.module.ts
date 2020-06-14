import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { DetailsComponent } from './components/details/details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AllStoresComponent } from './components/all-stores/all-stores.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule, MatExpansionModule, MatTabsModule } from '@angular/material';
import { AboutComponent } from './components/about/about.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActiveBookingsComponent } from './components/active-bookings/active-bookings.component';
import { PendingBookingsComponent } from './components/pending-bookings/pending-bookings.component';
import { CompletedBookingsComponent } from './components/completed-bookings/completed-bookings.component';
import { NavComponent } from './components/nav/nav.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    FooterComponent,
    DetailsComponent,
    BookingsComponent,
    AllStoresComponent,
    GoogleMapComponent,
    SearchLocationComponent,
    AboutComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ActiveBookingsComponent,
    PendingBookingsComponent,
    CompletedBookingsComponent,
    NavComponent,
    BookingSuccessComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBppYSp87gzh7a2dZ-ouFlYVY49dwKdRD4',
    }),
    AgmDirectionModule,
    FlashMessagesModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
