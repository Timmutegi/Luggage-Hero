import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stores: [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getStores();
  }

  getStores() {
    this.apiService.getStores('/business').subscribe(
      res => {
        console.log(res);
        this.stores = res;
      }
    );
  }

}
