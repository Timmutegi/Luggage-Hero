import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  show: boolean;
  status: string;
  oldFieldTextType: boolean;
  newFieldTextType: boolean;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.status = localStorage.getItem('user');
    this.getUser();
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
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
  }

}
