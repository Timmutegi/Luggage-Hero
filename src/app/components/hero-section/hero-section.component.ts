import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  searchForm: FormGroup;
  status: string;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('token');
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }
  get f() {
    return this.searchForm.controls;
  }

  search() {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
