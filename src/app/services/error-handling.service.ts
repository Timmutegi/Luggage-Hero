import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private flashMessage: FlashMessagesService) { }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `${error.error.details}`;
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    this.flashMessage.show(errorMessage, {cssClass: 'alert-danger rounded-0', timeout: 10000});
    return throwError(errorMessage);
  }
}
