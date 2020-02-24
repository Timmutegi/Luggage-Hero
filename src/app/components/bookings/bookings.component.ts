import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any;
  isLoading = true;

  constructor(private api: ApiService, private flashMessage: FlashMessagesService) { }

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
      }
    );
  }
}
