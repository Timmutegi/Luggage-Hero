import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-completed-bookings',
  templateUrl: './completed-bookings.component.html',
  styleUrls: ['./completed-bookings.component.scss']
})
export class CompletedBookingsComponent implements OnInit {
  completedBookings: [];
  isLoading = true;
  directions: any = [];
  lat: number;
  lng: number;
  message: string;
  @Input() completed: Subject<boolean> = new Subject<boolean>();


  constructor(private api: ApiService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lng = position.coords.longitude;
      this.lat = position.coords.latitude;
    });

    // this.getBookings();
    this.completed.subscribe(
      res => {
        if (res) {
          this.getBookings();
        }
      }
    );
  }

  getBookings() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/completed/' + user).subscribe(
      res => {
        res.forEach((booking: any) => {
          booking.shop.longitude = parseFloat(booking.shop.longitude);
          booking.shop.latitude = parseFloat(booking.shop.latitude);
        });
        this.completedBookings = res;
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
