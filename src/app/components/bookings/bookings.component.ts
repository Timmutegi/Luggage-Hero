import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LatLng } from '@agm/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any;
  isLoading = true;
  duration = false;
  directions: any = [];
  coordinates: any;
  lat: number;
  lng: number;

  constructor(private api: ApiService, private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.getLocation();
    this.getBookings();
  }

  getBookings() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/' + user).subscribe(
      res => {
        if (res.length === 0) {
          this.flashMessage.show('You have not yet booked any storage', {cssClass: 'alert-success', timeout: 10000});
        }
        this.bookings = res;
        this.isLoading = false;
        this.bookings.forEach((booking: any) => {
          booking.shop.longitude = parseFloat(booking.shop.longitude);
          booking.shop.latitude = parseFloat(booking.shop.latitude);

          // CALCULATES DURATION OF BOOKING
          if (booking.status === 'Active') {
            const current = new Date();
            const checkIn = new Date(booking.check_in);
            let difference = Math.abs(current.getTime() - checkIn.getTime()) / 1000;
            const days = Math.floor(difference / 86400);
            difference -= days * 86400;

            const hours = Math.floor(difference / 3600) % 24;
            difference -= hours * 3600;

            const minutes = Math.floor(difference / 60) % 60;
            difference -= minutes * 60;
            const seconds = Math.round(difference);

            booking.duration = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} seconds`;
          }
        });
      }
    );

  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
    position => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
    });
  }

  getDirections(latitude: number, longitude: number) {
    const directions = {
      origin: {
        lng: this.lng,
        lat: this.lat
      },
      destination: {
        lng: longitude,
        lat: latitude
      }
    };
    this.directions.push(directions);
  }

}
