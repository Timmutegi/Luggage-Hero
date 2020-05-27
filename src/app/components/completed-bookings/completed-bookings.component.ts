import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-completed-bookings',
  templateUrl: './completed-bookings.component.html',
  styleUrls: ['./completed-bookings.component.scss']
})
export class CompletedBookingsComponent implements OnInit {
  pendingBookings: any;
  isLoading = true;
  directions: any = [];
  lat: number;
  lng: number;
  message: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
    });

    this.getBookings();
  }

  getBookings() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/' + user).subscribe(
      res => {
        if (res === undefined || res.length === 0) {
          this.message = 'You have not booked yet';
        }
        res.forEach((booking: any) => {
          booking.shop.longitude = parseFloat(booking.shop.longitude);
          booking.shop.latitude = parseFloat(booking.shop.latitude);
        });
        this.pendingBookings = res;
        this.isLoading = false;
      },
    );
  }

  getDirections(latitude: number, longitude: number) {
    const directions = {
      origin: {
        lng: this.lng,
        lat: this.lat,
      },
      destination: {
        lng: longitude,
        lat: latitude,
      },
    };
    this.directions.push(directions);
  }

}
