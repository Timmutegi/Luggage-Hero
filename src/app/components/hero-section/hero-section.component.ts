import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  searchForm: FormGroup;
  status: string;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('token');
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      console.log(longitude, latitude);
      this.router.navigate([`my-location/${latitude}/${longitude}`]);
    });
  }

  search() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    const location = this.searchForm.value.search;
    console.log(location);
    this.router.navigate([`location/${location}`]);
  }

}
