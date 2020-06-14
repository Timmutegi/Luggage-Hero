import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss']
})
export class BookingSuccessComponent implements OnInit {
  isLoading = true;
  booking: any;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
  const ID = this.activatedRoute.snapshot.params.bookingID;
  this.api.get('/booking/' + ID).subscribe((res) => {
    this.isLoading = false;
    this.booking = res;
    console.log(this.booking);
  });
  }

}
