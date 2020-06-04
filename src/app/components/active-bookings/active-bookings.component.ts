import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-active-bookings',
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.scss']
})
export class ActiveBookingsComponent implements OnInit {
  activeBookings: [];
  isLoading = true;
  directions: any = [];
  lat: number;
  lng: number;
  @Input() active: Subject<boolean> = new Subject<boolean>();


  constructor(private api: ApiService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
      position => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
    });

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
