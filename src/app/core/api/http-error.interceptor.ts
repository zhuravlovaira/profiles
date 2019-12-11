import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any> , next: HttpHandler): Observable <HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((res: HttpErrorResponse) => {
          let errorMessage = '';
          if (res.error instanceof ErrorEvent) {
            errorMessage = `Something went wrong\n\nError: ${res.error.message}`;
          } else {
            errorMessage = `Something went wrong\n\nCode: ${res.status}\nMessage: ${res.message}`;
          }
          // todo parse errors
          this._snackBar.open(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}
