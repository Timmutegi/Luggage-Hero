import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  isLoading: boolean;
  fieldTextType: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService, private router: Router,
    private errorHandler: ErrorHandlingService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      phone: ['', [Validators.required, Validators.pattern('[7][0-9]{8}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  signup() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.api.signup('/user/register', this.signupForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('user', res.user);
        localStorage.setItem('firstname', res.firstname);
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.errorHandler.handleError(err);
      }
    );
  }

  toggle() {
    this.fieldTextType = !this.fieldTextType;
  }
}
