import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoading: boolean;
  fieldTextType: boolean;
  progress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService, private router: Router,
    private errorHandler: ErrorHandlingService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.api.login('/user/login', this.loginForm.value).subscribe(
      res => {
        if (res.code === 200) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.user);
          localStorage.setItem('firstname', res.firstname);
          this.router.navigate(['/home']);
          this.isLoading = false;
        }
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

  google() {
    this.api.google('/auth').subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
