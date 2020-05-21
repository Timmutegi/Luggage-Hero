import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthGuard } from './auth/auth.guard';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AllStoresComponent } from './components/all-stores/all-stores.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { AboutComponent } from './components/about/about.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: 'details/:ID', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'all', component: AllStoresComponent },
  { path: 'my-location/:LAT/:LONG', component: GoogleMapComponent },
  { path: 'location/:location', component: SearchLocationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
