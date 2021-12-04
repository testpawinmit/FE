/*START OF INTERCEPTORS FROM OLD PROJECT*/

import {Injectable, Component} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, empty, Subject} from 'rxjs';
import {catchError, tap, switchMap} from 'rxjs/operators';

import {JsonPipe} from '@angular/common';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DefaultInterceptor implements HttpInterceptor {
  isConnected = true;
  noInternetConnection: boolean;

  constructor(private authService: AuthService,
  ) {

  }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (false) {


    } else {
      request = this.addAuthheader(request);
      console.log(request);


      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // 401 error so we are unauthorized
              // refresh the access token
              console.log('Unauthorozed');
              return this.refreshAccessToken()
                .pipe(
                  switchMap(() => {
                    request = this.addAuthheader(request);
                    return next.handle(request);
                  }),
                  catchError((err: any) => {
                    console.log(err);
                    this.authService.logout();
                    return empty();
                  })
                )
            }
            return throwError(error);
          }
        )
      )
    }

  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      )
    }

  }


  addAuthheader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Control-Allow-Origin': '*'
        }
      })
    }
    return request;
  }


}
