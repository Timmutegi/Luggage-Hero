import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Id: string;
  user: any;
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.Id = localStorage.getItem('user');

    this.api.get('/users/' + this.Id).subscribe(
      res => {
        this.user = res;
        this.isLoading = false;
      }
    );
  }

}
