import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { ApiService } from '../../services/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;
  clicked: boolean;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private flashMessage: FlashMessagesService,
              private errorHandler: ErrorHandlingService
            ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      phone: ['', [Validators.required, Validators.pattern('[7][0-9]{8}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  reset() {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }
    console.log(this.forgotForm.value);

    this.clicked = true;
    this.api.reset('/user/reset', this.forgotForm.value).subscribe(
      res => {
        console.log(res);
        this.submitted = false;
        this.forgotForm.reset();
        this.flashMessage.show('You password has been reset.', {cssClass: 'p-1', timeout: 10000});
        this.clicked = false;
      },
      err => {
        this.clicked = false;
        this.errorHandler.handleError(err);
      }
    );
  }

}
