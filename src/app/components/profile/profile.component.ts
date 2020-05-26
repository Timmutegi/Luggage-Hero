import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  passwordForm: FormGroup;
  submitted = false;
  Id: string;
  user: any;
  isLoading = true;
  isProgress: boolean;
  show: boolean;
  status: string;
  oldFieldTextType: boolean;
  newFieldTextType: boolean;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorHandler: ErrorHandlingService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.status = localStorage.getItem('user');
    this.getUser();
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.passwordForm.controls;
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

  toggle() {
    this.show = !this.show;
  }

  toggleOldFieldTextType() {
    this.oldFieldTextType = !this.oldFieldTextType;
  }

  toggleNewFieldTextType() {
    this.newFieldTextType = !this.newFieldTextType;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.status = null;
    this.user = null;
    localStorage.removeItem('firstname');
    localStorage.removeItem('user');
  }

  changePassword() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }
    this.isProgress = true;

    this.api.patch('/users/password/' + this.Id, this.passwordForm.value).subscribe(
      res => {
        if (res.code === 200) {
          this.submitted = false;
          this.passwordForm.reset();
          this.isProgress = false;
          this.flashMessage.show(res.message, {cssClass: 'alert-success rounded-0', timeout: 10000});
        }
      },
      err => {
        this.isProgress = false;
        this.errorHandler.handleError(err);
      }
    );
  }

}
