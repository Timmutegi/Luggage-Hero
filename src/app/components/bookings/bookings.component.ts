import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: any;
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.api.get('/booking/customer/' + user).subscribe(
      res => {
        console.log(res);
        this.bookings = res;
        this.isLoading = false;
      }
    );
  }
}
