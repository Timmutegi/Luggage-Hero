import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ID: string;
  business: any;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    console.log(this.ID);
    this.api.get('/business/' + this.ID).subscribe(
      res => {
        console.log(res);
        this.business = res;
      }
    );
  }

  confirm(ID: string) {
    const user = localStorage.getItem('user');
    const booking = JSON.parse(JSON.stringify(
      {
        customer: user,
        shop: ID,
        status: 'pending'
      }
    ));
    this.api.post('/booking/create', booking).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/bookings']);
      }
    );
  }

}
