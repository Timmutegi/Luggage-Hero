import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  status: string;
  user: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('user');
    this.user = localStorage.getItem('firstname');
  }
  clickMenu() {
    const navs = document.querySelectorAll('.Navbar-Items');

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));
  }

  home() {
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.status = null;
    this.user = null;
    localStorage.removeItem('firstname');
  }

  login() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  bookings() {
    this.router.navigate(['bookings']);
  }

}
