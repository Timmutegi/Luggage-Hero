import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-active-bookings',
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.scss']
})
export class ActiveBookingsComponent implements OnInit {
  activeBookings: any;
  isLoading = true;
  directions: any = [];
  lat: number;
  lng: number;
  message: string;
  @Input() active: Subject<boolean> = new Subject<boolean>();


  constructor(private api: ApiService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
      position => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
    });

    // this.getBookings();
    this.active.subscribe(
      res => {
        if (res) {
          this.getBookings();
        }
      }
    );
  }

  getBookings() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/active/' + user).subscribe(
      res => {
        if (res.length === 0) {
          this.message = 'You do not have active bookings. Once you book and check in, your booking will become active.';
        }
        res.forEach((booking: any) => {
          booking.shop.longitude = parseFloat(booking.shop.longitude);
          booking.shop.latitude = parseFloat(booking.shop.latitude);
        });
        this.activeBookings = res;
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
