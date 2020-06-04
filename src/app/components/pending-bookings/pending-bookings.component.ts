import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pending-bookings',
  templateUrl: './pending-bookings.component.html',
  styleUrls: ['./pending-bookings.component.scss']
})
export class PendingBookingsComponent implements OnInit {
  pendingBookings: [];
  isLoading = true;
  directions: any = [];
  lat: number;
  lng: number;
  message: string;
  @Input() pending: Subject<boolean> = new Subject<boolean>();


  constructor(private api: ApiService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
    });

    this.getBookings();
    this.pending.subscribe(
      res => {
        if (res) {
          this.getBookings();
        }
      }
    );
  }

  getBookings() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/pending/' + user).subscribe(
      res => {
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

