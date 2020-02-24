import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
      }
    );
  }

  book(ID: string) {
    console.log(ID);
    this.router.navigate([`details/${ID}`]);
  }

}
