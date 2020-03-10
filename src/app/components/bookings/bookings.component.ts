import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any;
  isLoading = true;

  constructor(private api: ApiService, private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/' + user).subscribe(
      res => {
        console.log(res);
        if (res.length === 0) {
          this.flashMessage.show('You have not yet booked any storage', {cssClass: 'alert-success', timeout: 10000});
        }
        this.bookings = res;
        this.isLoading = false;
        this.bookings.forEach((booking: any) => {
          booking.shop.longitude = parseFloat(booking.shop.longitude);
          booking.shop.latitude = parseFloat(booking.shop.latitude);
        });
      }
    );
  }

  home() {
    this.router.navigate(['/home']);
  }
}
