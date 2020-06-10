import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  status: string;
  user: string;

  constructor() { }

  ngOnInit() {
    this.status = localStorage.getItem('user');
    this.user = localStorage.getItem('firstname');
  }

  logout() {
    localStorage.clear();
    this.status = null;
    this.user = null;
  }

}
