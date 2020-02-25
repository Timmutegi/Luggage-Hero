import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  searchForm: FormGroup;
  status: string;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.status = localStorage.getItem('token');
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }
  get f() {
    return this.searchForm.controls;
  }

  search() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
  }

}
