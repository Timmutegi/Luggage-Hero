import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeForm: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribeForm = this.formBuilder.group({
      subscribe: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]]
    });
  }

  get f() {
    return this.subscribeForm.controls;
  }

  subscribe() {
    this.submitted = true;
    if (this.subscribeForm.invalid) {
      return;
    }
    const email = this.subscribeForm.value.subscribe;
    console.log(email);

  }

}
