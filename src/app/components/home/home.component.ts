import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { fadeInAnimation, slideInAnimation } from '../../route-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInAnimation]
})
export class HomeComponent implements OnInit {
  stores: [];
  isLoading = true;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getStores();
  }

  getStores() {
    this.apiService.get('/business').subscribe(
      res => {
        // console.log(res);
        this.isLoading = false;
        this.stores = res;
        this.stores.forEach((store: any) => {
          store.longitude = parseFloat(store.longitude);
          store.latitude = parseFloat(store.latitude);
        });
      }
    );
  }

  allStores() {
    this.router.navigate(['all']);
  }

  book(ID: string) {
    console.log(ID);
    this.router.navigate([`details/${ID}`]);
  }

}

