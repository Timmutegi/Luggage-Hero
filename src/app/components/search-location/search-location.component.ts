import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  location: string;
  isLoading = true;
  stores: [];
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.params.location;
    this.api.get('/business/stores/' + this.location).subscribe(
      res => {
        console.log(res);
        if (res.length === 0) {
          this.isLoading = false;
          this.message = 'No store found in the selected area. Try Nairobi';
        }
        this.stores = res;
        this.isLoading = false;
      }
    );
  }

  book(ID: string) {
    console.log(ID);
    this.router.navigate([`details/${ID}`]);
  }

}
