import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.scss']
})
export class AllStoresComponent implements OnInit {
  isLoading = true;
  stores: [];

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

  home() {
    this.router.navigate(['home']);
  }

  book(ID: string) {
    console.log(ID);
    this.router.navigate([`details/${ID}`]);
  }

}
